import { PhraseSpec } from '../../schema';
import { PhraseEvents } from '../types';
import { Phrase } from './Phrase';

type PhrasesProps = PhraseEvents & {
  /**
   * @description specification of phrase text spec
   * @description.zh-CN 短语描述 json 信息
   */
  spec: PhraseSpec[];
};

export function Phrases({ spec, ...events }: PhrasesProps) {
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        return <Phrase key={phrase.key || key} spec={phrase} {...events} />;
      })}
    </>
  );
}

export { Phrase } from './Phrase';
