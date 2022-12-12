import { PATH_SEPARATOR } from './utils';

type TGetOptions = {
  defaultValue?: string;
  pathSeparator?: string;
};

export function get(
  obj: { [key: string]: any },
  path: string | any[],
  options: TGetOptions = {}
) {
  // @ts-ignore
  let result = path.charCodeAt
    ? getUsingStrPath(obj, path as string, options)
    : getUsingArrayPath(obj, path as any[]);

  return result !== undefined ? result : options.defaultValue;
}

function getUsingArrayPath(obj: any, path: any[]) {
  let i = 0;
  while (i < path.length) {
    try {
      obj = obj[path[i]];
    } catch {
      return;
    }

    i++;
  }

  return obj;
}

function getUsingStrPath(obj: any, path: string, options: TGetOptions) {
  let pathCharIndex = 0;
  let mostNestedObj = obj;

  while (pathCharIndex < path.length) {
    let { key, charPosition } = getNextKeyInStrPath(
      path,
      pathCharIndex,
      options.pathSeparator || PATH_SEPARATOR
    );

    try {
      mostNestedObj = mostNestedObj[key];
    } catch {
      return undefined;
    }
    /* jump to the first char in the next key */
    pathCharIndex = charPosition;
  }

  return mostNestedObj;
}

function getNextKeyInStrPath(
  path: string,
  charPosition: number,
  pathSeparator: string
) {
  let key = '';

  while (path[charPosition] !== pathSeparator && charPosition < path.length) {
    key += path[charPosition];
    charPosition++;
  }

  charPosition++;

  return { key, charPosition };
}
