import { PhraseSpec } from '../../schema';
import { Phrase } from './Phrase';

type PhrasesProps = {
  /**
   * @description specification of phrase text spec
   * @description.zh-CN 短语描述 json 信息
   */
  spec: PhraseSpec[];
};

export function Phrases({ spec }: PhrasesProps) {
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        return <Phrase key={phrase.key || key} spec={phrase} />;
      })}
    </>
  );
}

export { Phrase } from './Phrase';

export type { TooltipProps } from './ui';
