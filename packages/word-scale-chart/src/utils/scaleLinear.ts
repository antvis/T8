export type Domain = [number, number];
export type Range = [number, number];

export type Scale = (n: number) => number;

export const scaleLinear =
  (domain: Domain, range: Range): Scale =>
  (n) => {
    const [d1, d2] = domain;
    const [r1, r2] = range;
    return (n / (r2 - r1)) * (d2 - d1);
  };
