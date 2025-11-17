/**
 * 从流式响应的 delta 中提取文本内容
 */
export const pickDeltaContent = (chunk: unknown): string => {
  if (typeof chunk === 'string') {
    return chunk;
  }
  if (Array.isArray(chunk)) {
    return chunk
      .map((item) => (typeof item === 'string' ? item : typeof item?.text === 'string' ? item.text : ''))
      .join('');
  }
  if (chunk && typeof chunk === 'object' && 'text' in (chunk as Record<string, unknown>)) {
    return typeof (chunk as { text?: string }).text === 'string' ? ((chunk as { text?: string }).text ?? '') : '';
  }
  return '';
};
