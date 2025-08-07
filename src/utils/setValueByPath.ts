type Path = (string | number)[];

export function setValueByPath<T extends object>(obj: T, pathArr: Path, value: unknown): boolean {
  if (pathArr.length === 0) {
    Object.assign(obj, value);
    return false;
  }

  if (pathArr.length === 1) {
    const key = pathArr[0];
    if (obj && typeof obj === 'object') {
      (obj as Record<string, unknown>)[key] = value;
      return true;
    }
    return false;
  }

  const [key, ...restPath] = pathArr;

  if (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, key)) {
    return setValueByPath(obj[key] as T, restPath, value);
  } else {
    return false;
  }
}
