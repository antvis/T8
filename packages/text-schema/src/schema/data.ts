export type RawData = Record<string, unknown>[];
export interface FilterItem {
  left: string;
  // TODO 可以补充更多
  op: '=' | '<' | '>';
  right: string;
}
