export const getSafeDomain = (data: number[]): [number, number] => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  return min === max ? [min - 1, max + 1] : [min, max];
};
