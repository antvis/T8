import type { NarrativeTextSpec } from '@t8/schema';

export type AgentMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  spec?: Partial<NarrativeTextSpec>;
};

export type ProviderType = 'openai' | 'deepseek';

export type RequestPayload = {
  llmKey?: string;
  endpoint?: string;
  model?: string;
  provider?: ProviderType;
  messages?: AgentMessage[];
};

export type AgentRequestInput = RequestPayload & { message: AgentMessage };
