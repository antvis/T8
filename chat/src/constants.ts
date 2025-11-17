import analystPrompt from '../../prompt.zh-CN.md?raw';
import schema from '../../schema.json?raw';
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
};

export const SYSTEM_PROMPT = [analystPrompt.trim(), schema.trim()].join('\n\n');
