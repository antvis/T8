import { useMemo } from 'react';
import { Bubble, Sender } from '@ant-design/x';
import { Flex, Typography } from 'antd';
import NarrativeViewer from './NarrativeViewer';
import type { AgentMessage } from '../types';

type ChatAreaProps = {
  messages: Array<{
    id: string | number;
    message: AgentMessage;
    status: string;
  }>;
  onSend: (value: string) => void;
  disabled?: boolean;
};

export const ChatArea = ({ messages, onSend, disabled = false }: ChatAreaProps) => {
  const bubbleItems = useMemo(() => {
    return messages.map(({ id, message, status }) => {
      return {
        key: String(id),
        placement: (message.role === 'user' ? 'end' : 'start') as 'start' | 'end',
        typing: status === 'loading' || status === 'updating',
        content:
          message.role === 'assistant' ? (
            <NarrativeViewer content={message.content} fallbackText={message.content} />
          ) : (
            <Typography.Text>{message.content}</Typography.Text>
          ),
        role: message.role,
      };
    });
  }, [messages]);

  return (
    <Flex vertical gap={16} className="chat-wrapper">
      <div className="chat-body">
        <Bubble.List
          className="chat-messages"
          items={bubbleItems}
          roles={{
            user: { placement: 'end' },
            assistant: { placement: 'start' },
          }}
        />
      </div>
      <div className="chat-input">
        <Sender
          className="chat-sender"
          onSubmit={onSend}
          disabled={disabled}
          placeholder={disabled ? '请输入 LLM Key 后开始对话' : '输入你的问题，按 Enter 发送'}
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
      </div>
    </Flex>
  );
};
