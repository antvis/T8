import { Default } from './Default';
import { DeltaValue } from './DeltaValue';
import { RatioValue } from './RatioValue';
import { DimValue } from './DimValue';
import { TrendDesc } from './TrendDesc';
import { Custom } from './Custom';

type InternalPhraseType = typeof Default;

interface PhraseType extends InternalPhraseType {
  DeltaValue: typeof DeltaValue;
  RatioValue: typeof RatioValue;
  DimValue: typeof DimValue;
  TrendDesc: typeof TrendDesc;
  Custom: typeof Custom;
}

// TODO 目前组件的 props 设计的不太合理，先做可单独使用的结构，待 metadata 完备之后再优化 props
/** <Phrase /> can use independence */
export const Phrase = Default as PhraseType;

Phrase.DeltaValue = DeltaValue;
Phrase.RatioValue = RatioValue;
Phrase.DimValue = DimValue;
Phrase.TrendDesc = TrendDesc;
Phrase.Custom = Custom;
