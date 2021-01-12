import { PATH_SEPERATOR } from "./utils";

type TGetOptions = {
  defaultValue?: string;
  pathSeparator?: string;
};

export function get(
  obj: { [key: string]: any },
  path: string | Array<any>,
  options: TGetOptions = {}
) {
  let result = Array.isArray(path)
    ? getUsingArrayPath(obj, path)
    : getUsingStrPath(obj, path, options);

  return result !== undefined ? result : options.defaultValue;
}

function getUsingArrayPath(obj: any, path: Array<string>) {
  let keyIndex = 0;
  let mostNestedObj = obj;

  while (keyIndex < path.length) {
    let key = path[keyIndex];

    try {
      mostNestedObj = mostNestedObj[key];
    } catch {
      return undefined;
    }

    keyIndex++;
  }

  return mostNestedObj;
}

function getUsingStrPath(obj: any, path: string, options: TGetOptions) {
  let pathCharIndex = 0;
  let mostNestedObj = obj;

  while (pathCharIndex < path.length) {
    let { key, charPosition } = getNextKeyInStrPath(
      path,
      pathCharIndex,
      options.pathSeparator || PATH_SEPERATOR
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

function getNextKeyInStrPath(path: string, charPosition: number, pathSeparator: string) {
  let key = "";

  while (path[charPosition] !== pathSeparator && charPosition < path.length) {
    key += path[charPosition];
    charPosition++;
  }

  charPosition++;

  return { key, charPosition };
}
