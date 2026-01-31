import analystPrompt from '../../prompt.zh-CN.md?raw';
import type { ProviderType } from './types';

export const PROVIDER_PRESETS: Record<
  ProviderType,
  {
    name: string;
    endpoint: string;
    model: string;
    keyLabel: string;
  }
> = {
  openai: {
    name: 'OpenAI',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    keyLabel: 'OpenAI API Key',
  },
  deepseek: {
    name: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    keyLabel: 'DeepSeek API Key',
  },
  moonshot: {
    name: 'Moonshot',
    endpoint: 'https://api.moonshot.cn/v1/chat/completions',
    model: 'moonshot-v1-8k',
    keyLabel: 'Moonshot API Key',
  },
  qwen: {
    name: 'Qwen (DashScope)',
    endpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    model: 'qwen-plus',
    keyLabel: 'DashScope API Key',
  },
  groq: {
    name: 'Groq',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.1-70b-versatile',
    keyLabel: 'Groq API Key',
  },
  stepfun: {
    name: 'StepFun',
    endpoint: 'https://api.stepfun.com/v1/chat/completions',
    model: 'step-1-8k',
    keyLabel: 'StepFun API Key',
  },
  gemini: {
    name: 'Gemini (Google)',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    model: 'gemini-2.0-flash-exp',
    keyLabel: 'Google AI API Key',
  },
  claude: {
    name: 'Claude (Anthropic)',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'anthropic/claude-3.5-sonnet',
    keyLabel: 'OpenRouter API Key',
  },
};

export const SYSTEM_PROMPT = analystPrompt.trim();
