const PATH_SEPERATOR = ".";

type TGetOptions = {
  defaultValue?: string;
  pathSeparator?: string;
};

type TSetOptions = {
  pathSeparator?: string;
};

export function get(
  obj: { [key: string]: any },
  path: string,
  options: TGetOptions = {}
) {
  let newObj = obj;
  let pathCharIndex = 0;

  while (pathCharIndex < path.length) {
    let { key, charPosition } = getNextKey(path, pathCharIndex, PATH_SEPERATOR);
    let value = newObj[key];

    pathCharIndex = charPosition;

    if (isObject(value)) {
      newObj = value;
      continue;
    }

    /* if it's not an object, it means we can't go deeper, so we return immediately */
    return value;
  }

  return newObj !== undefined ? newObj : options.defaultValue;
}

export function set(
  obj: { [key: string]: any },
  path: string | Array<string>,
  userValue: string | object = {},
  options: TSetOptions = {}
) {
  /* Support having no obj */
  if (typeof obj === "string") {
    userValue = path;
    path = obj;
    obj = {};
  } else if (!isObject(obj)) {
    throw Error(
      "Must supply an Object or omit the first parameter and do this instead: set(path, newValue) "
    );
  }

  let keys = formatKeys(path, options.pathSeparator);
  let mostNestedObj = obj;
  let keyIndex = 0;

  /* get the deepest object possible */
  while (keyIndex < keys.length) {
    const key = keys[keyIndex];
    const value = mostNestedObj[key];

    if (isObject(value)) {
      mostNestedObj = value;
    } else {
      break;
    }

    keyIndex++;
  }

  /* set remaining keys */
  while (keyIndex < keys.length) {
    const key = keys[keyIndex];
    const isLastKey = keyIndex === keys.length - 1;

    if (isLastKey) {
      mostNestedObj[key] = userValue;
    } else {
      /* create an empty object at the current key */
      mostNestedObj[key] = {};

      /* point our most nested object to the new empty object */
      mostNestedObj = mostNestedObj[key];
    }

    keyIndex++;
  }

  return obj;
}

function getNextKey(path: string, charPosition: number, pathSeparator: string) {
  let key = "";

  while (path[charPosition] !== pathSeparator && charPosition < path.length) {
    key += path[charPosition];
    charPosition++;
  }

  charPosition++;

  return { key, charPosition };
}

function formatKeys(
  path: string | Array<string>,
  pathSeparator: string | undefined
) {
  if (typeof path !== "string" && !Array.isArray(path))
    throw Error("Path must be of type String or Array");

  return Array.isArray(path)
    ? path
    : path.split(pathSeparator || PATH_SEPERATOR);
}

function isObject(value: any) {
  return value && typeof value === "object" && value.constructor === Object;
}
