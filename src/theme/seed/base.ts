export const baseSeedToken = {
  fontFamily: 'PingFangSC, sans-serif',
  borderColor: 'rgb(199, 199, 199)',

  fontSize: 14,
  lineHeight: 24,

  /**
   * if pages use small and normal size together, rem will not work.
   * so we use fontSizeMultiple to calculate the fontSize instead of rem.
   */
  fontSizeMultiples: {
    h1: 2,
    h2: 1.72,
    h3: 1.4,
    h4: 1.15,
    h5: 1.08,
    h6: 1.08,
  },

  lineHeightMultiples: {
    h1: 1.5,
    h2: 1.3,
    h3: 1.15,
    h4: 1,
    h5: 1,
    h6: 1,
  },
} as const;
