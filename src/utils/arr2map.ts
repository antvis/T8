// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arr2map<T extends Record<string, any>>(arr: T[], keyId: string) {
  return arr.reduce<Record<string, T>>((prev, curr) => {
    prev[curr[keyId]] = curr;
    return prev;
  }, {});
}
