import { Input, Select, Space, Typography } from 'antd';
import { PROVIDER_PRESETS } from '../constants';
import type { ProviderType } from '../types';

type ControlPanelProps = {
  provider: ProviderType;
  llmKey: string;
  model: string;
  endpoint: string;
  onProviderChange: (provider: ProviderType) => void;
  onLlmKeyChange: (key: string) => void;
  onModelChange: (model: string) => void;
  onEndpointChange: (endpoint: string) => void;
};

export const ControlPanel = ({
  provider,
  llmKey,
  model,
  endpoint,
  onProviderChange,
  onLlmKeyChange,
  onModelChange,
  onEndpointChange,
}: ControlPanelProps) => {
  const activePreset = PROVIDER_PRESETS[provider];

  const handleProviderChange = (value: ProviderType) => {
    onProviderChange(value);
    const preset = PROVIDER_PRESETS[value];
    onEndpointChange(preset.endpoint);
    onModelChange(preset.model);
  };

  return (
    <Space direction="vertical" size="large" className="control-stack">
      <div className="control-row">
        <Typography.Text className="control-label">服务提供方</Typography.Text>
        <Select
          size="large"
          value={provider}
          onChange={handleProviderChange}
          options={Object.entries(PROVIDER_PRESETS).map(([value, preset]) => ({
            value,
            label: preset.name,
          }))}
        />
      </div>
      <div className="control-row">
        <Typography.Text className="control-label">API Key</Typography.Text>
        <Input.Password
          size="large"
          placeholder={`请输入 ${activePreset.keyLabel}`}
          value={llmKey}
          onChange={(event) => onLlmKeyChange(event.target.value)}
        />
      </div>
      <div className="control-row">
        <Typography.Text className="control-label">模型名称</Typography.Text>
        <Input
          size="large"
          placeholder={`例如 ${activePreset.model}`}
          value={model}
          onChange={(event) => onModelChange(event.target.value)}
        />
      </div>
      <div className="control-row">
        <Typography.Text className="control-label">接口地址</Typography.Text>
        <Input
          size="large"
          placeholder={`例如 ${activePreset.endpoint}`}
          value={endpoint}
          onChange={(event) => onEndpointChange(event.target.value)}
        />
      </div>
      <Typography.Text type="secondary" className="credential-tip">
        Key 仅保存在本地浏览器，请确认你使用的接口已开启 CORS 或通过代理转发。
      </Typography.Text>
    </Space>
  );
};
