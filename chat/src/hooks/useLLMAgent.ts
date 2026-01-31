import { useXAgent } from '@ant-design/x';
import { parseSyntax } from '@t8/parser';
import { PROVIDER_PRESETS, SYSTEM_PROMPT } from '../constants';
import { pickDeltaContent } from '../utils';
import type { AgentMessage, AgentRequestInput } from '../types';

export const useLLMAgent = () => {
  const [agent] = useXAgent<AgentMessage, AgentRequestInput, AgentMessage>({
    request: async (info, callbacks) => {
      const providerName = info.provider ?? 'openai';
      const preset = PROVIDER_PRESETS[providerName] ?? PROVIDER_PRESETS.openai;
      const key = info.llmKey;
      const url = info.endpoint || preset.endpoint;
      const modelName = info.model || preset.model;
      const { message, messages = [] } = info;

      if (!key) {
        callbacks.onError(new Error('请先输入 LLM Key'));
        return;
      }

      const historyMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(({ role, content }) => ({
          role,
          content: content ?? '',
        })),
        { role: message.role, content: message.content ?? '' },
      ];

      try {
        const payload = {
          model: modelName,
          stream: true,
          messages: historyMessages,
          max_tokens: 8192,
        };

        // Gemini 使用查询参数方式传递 API key
        const isGemini = providerName === 'gemini';
        const requestUrl = isGemini ? `${url}?key=${encodeURIComponent(key)}` : url;
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (!isGemini) {
          headers.Authorization = `Bearer ${key}`;
        }

        const response = await fetch(requestUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'LLM 接口调用失败');
        }

        if (!response.body) {
          const fallbackData = await response.json();
          const text =
            fallbackData?.choices?.[0]?.message?.content ||
            (Array.isArray(fallbackData?.choices?.[0]?.message?.content)
              ? fallbackData.choices[0].message.content.map((item: { text?: string }) => item.text).join('\n')
              : '');
          callbacks.onSuccess([
            {
              role: 'assistant',
              content: text,
            },
          ]);
          return;
        }

        // 处理流式响应
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        let aggregated = '';
        let streamFinished = false;
        const THROTTLE_INTERVAL = 120;
        let lastUpdateAt = 0;
        let pendingUpdateTimer: ReturnType<typeof setTimeout> | null = null;

        const dispatchUpdate = () => {
          // Parse the accumulated T8 syntax content
          let spec;
          try {
            spec = parseSyntax(aggregated);
          } catch (error) {
            // If parsing fails (e.g., incomplete content), use partial content
            console.warn('Parsing incomplete T8 syntax during streaming', error);
            spec = undefined;
          }

          callbacks.onUpdate({
            role: 'assistant',
            content: aggregated,
            spec,
          });
        };

        const emitUpdate = () => {
          pendingUpdateTimer = null;
          lastUpdateAt = performance.now();
          dispatchUpdate();
        };

        const scheduleUpdate = () => {
          const now = performance.now();
          const elapsed = now - lastUpdateAt;
          if (elapsed >= THROTTLE_INTERVAL) {
            emitUpdate();
            return;
          }
          if (pendingUpdateTimer) return;
          pendingUpdateTimer = setTimeout(() => {
            emitUpdate();
          }, THROTTLE_INTERVAL - elapsed);
        };

        const flushPendingUpdate = () => {
          if (pendingUpdateTimer) {
            clearTimeout(pendingUpdateTimer);
            pendingUpdateTimer = null;
          }
          if (aggregated) {
            dispatchUpdate();
          }
        };

        while (!streamFinished) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const segments = buffer.split('\n\n');
          buffer = segments.pop() ?? '';

          for (const segment of segments) {
            const trimmed = segment.trim();
            if (!trimmed || !trimmed.startsWith('data:')) continue;

            const jsonPayload = trimmed.replace(/^data:\s*/, '');
            if (jsonPayload === '[DONE]') {
              streamFinished = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonPayload);
              const delta = parsed?.choices?.[0]?.delta;
              const chunkText = pickDeltaContent(delta?.content);
              if (!chunkText) continue;

              aggregated += chunkText;
              scheduleUpdate();
            } catch (err) {
              console.warn('解析流数据失败', err);
            }
          }
        }

        flushPendingUpdate();

        // Parse final complete T8 syntax content
        let finalSpec;
        try {
          finalSpec = parseSyntax(aggregated);
        } catch (error) {
          console.warn('Failed to parse final T8 syntax', error);
          finalSpec = undefined;
        }

        callbacks.onSuccess([
          {
            role: 'assistant',
            content: aggregated,
            spec: finalSpec,
          },
        ]);
      } catch (error) {
        const err = error instanceof Error ? error : new Error('LLM 请求失败');
        callbacks.onError(err);
      }
    },
  });

  return agent;
};
