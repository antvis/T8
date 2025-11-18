export interface RestoreContext {
  parentKey?: string;
  path: string;
  strict: boolean;
}

export interface RestoreOptions {
  strict?: boolean;
}

export type ShrunkenRecord = Record<string, unknown>;

export interface PhraseContainer {
  dt: unknown;
  i: unknown;
}
