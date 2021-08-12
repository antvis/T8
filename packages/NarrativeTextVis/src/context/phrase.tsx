import React, { useContext, useState } from 'react';
import { DetailChartDisplayType } from '../interface';

interface ContextProps {
  detailChartDisplayType: DetailChartDisplayType;
  setDetailChartDisplayType: (chartType: DetailChartDisplayType) => void;
}

type ContextGeneric = Partial<ContextProps>;

const detailPhraseContext: ContextGeneric = {
  detailChartDisplayType: 'inline',
};

const PhraseContext = React.createContext<ContextGeneric>(detailPhraseContext);

export const usePhraseCtx = () => useContext(PhraseContext);

export function PhraseCtxProvider({ children }) {
  const [detailChartDisplayType, setDetailChartDisplayType] = useState<DetailChartDisplayType>(
    detailPhraseContext.detailChartDisplayType,
  );

  return (
    <PhraseContext.Provider
      value={{
        detailChartDisplayType,
        setDetailChartDisplayType,
      }}
    >
      {children}
    </PhraseContext.Provider>
  );
}
