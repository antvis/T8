export type SeedTokenOptions = {
  fontSize: number;
  lineHeight: number;

  fontFamily: string;
  borderColor: string;

  fontSizeMultiples: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };

  lineHeightMultiples: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };

  colorBase: string;
  colorEntityBase: string;
  colorPositive: string;
  colorNegative: string;
  colorConclusion: string;
  colorDimensionValue: string;
  colorMetricName: string;
  colorMetricValue: string;
  colorOtherValue: string;
  colorProportionShadow: string;
  colorProportionFill: string;
  colorLineStroke: string;
};
