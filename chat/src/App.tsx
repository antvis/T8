import { useState } from 'react';
import { useXChat } from '@ant-design/x';
import { Card, ConfigProvider, Typography, theme } from 'antd';
import { useLLMAgent } from './hooks/useLLMAgent';
import { ControlPanel } from './components/ControlPanel';
import { ChatArea } from './components/ChatArea';
import { PROVIDER_PRESETS } from './constants';
import type { AgentMessage, AgentRequestInput, ProviderType } from './types';

function App() {
  const [llmKey, setLlmKey] = useState('');
  const [provider, setProvider] = useState<ProviderType>('openai');
  const [endpoint, setEndpoint] = useState(PROVIDER_PRESETS.openai.endpoint);
  const [model, setModel] = useState(PROVIDER_PRESETS.openai.model);

  const agent = useLLMAgent();

  const { parsedMessages, onRequest } = useXChat<AgentMessage, AgentMessage, AgentRequestInput, AgentMessage>({
    agent,
    parser: (message) => message,
    requestPlaceholder: {
      role: 'assistant',
      content: '正在思考...',
    },
    requestFallback: {
      role: 'assistant',
      content: '请求失败，请稍后重试。',
    },
  });

  const handleSend = (value: string) => {
    const text = value.trim();
    if (!text) {
      return;
    }
    onRequest({
      message: {
        role: 'user',
        content: text,
      },
      llmKey,
      endpoint,
      model,
      provider,
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorBgLayout: '#eef4ff',
        },
      }}
    >
      <div className="app-shell">
        <header className="hero">
          <div>
            <Typography.Title level={3} className="hero-title">
              T8 AI Chat Playground
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="hero-desc">
              使用 Ant Design X 打造的聊天体验，接入任意兼容的 LLM，并用 T8 渲染结构化回复。
            </Typography.Paragraph>
          </div>
        </header>

        <section className="app-grid">
          <Card className="control-card" title="连接你的模型" bordered={false}>
            <ControlPanel
              provider={provider}
              llmKey={llmKey}
              model={model}
              endpoint={endpoint}
              onProviderChange={setProvider}
              onLlmKeyChange={setLlmKey}
              onModelChange={setModel}
              onEndpointChange={setEndpoint}
            />
          </Card>

          <Card className="chat-card" title="对话区" bordered={false}>
            <ChatArea messages={parsedMessages} onSend={handleSend} disabled={!llmKey} />
          </Card>
        </section>

        <footer className="app-footer">
          <Typography.Text type="secondary">Made with Ant Design X ✕ T8</Typography.Text>
        </footer>
      </div>
    </ConfigProvider>
  );
}

export default App;
