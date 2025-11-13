import { ParagraphType } from '../schema';
import { SeedTokenOptions } from '../theme';

export type ChartRenderFunction<T> = (
  container: Element,
  config: T,
  paragraphType: ParagraphType,
  themeSeedToken: SeedTokenOptions,
) => void;
