import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/compat';
import { ParagraphType } from '../../../schema';

type CurrentParagraphInfoContextType = {
  paragraphType: ParagraphType;
};

// current paragraph info
type CurrentParagraphInfoProps = {
  children: ComponentChildren;
} & CurrentParagraphInfoContextType;

export function CurrentParagraphInfoProvider({ paragraphType, children }: CurrentParagraphInfoProps) {
  return (
    <CurrentParagraphInfoContext.Provider value={{ paragraphType }}>{children}</CurrentParagraphInfoContext.Provider>
  );
}

const CurrentParagraphInfoContext = createContext<CurrentParagraphInfoContextType>({
  paragraphType: ParagraphType.NORMAL,
});

export function useCurrentParagraphInfo() {
  const paragraphInfo = useContext(CurrentParagraphInfoContext);
  return paragraphInfo;
}
