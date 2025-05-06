import { PhraseSpec } from '../../schema';
import { ExtensionProps, PhraseEvents } from '../../interface';
import { Phrase } from './Phrase';
import { presetPluginManager } from '../../plugin';

type PhrasesProps = ExtensionProps &
  PhraseEvents & {
    /**
     * @description specification of phrase text spec
     * @description.zh-CN 短语描述 json 信息
     */
    spec: PhraseSpec[];
  };

export function Phrases({ spec, pluginManager = presetPluginManager, ...events }: PhrasesProps) {
  return (
    <>
      {spec?.map((phrase, index) => {
        const key = `${index}-${phrase.value}`;
        return <Phrase key={phrase.key || key} spec={phrase} pluginManager={pluginManager} {...events} />;
      })}
    </>
  );
}

export { Phrase } from './Phrase';
