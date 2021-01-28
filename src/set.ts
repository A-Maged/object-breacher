import { isObject, formatKeys } from "./utils";

type TSetOptions = {
  pathSeparator?: string;
};

export function set(
  obj: { [key: string]: any } | string,
  path: string | Array<string>,
  userValue: string | object = {},
  options: TSetOptions = {}
) {
  /* Support having no obj */
  if (typeof obj === "string" || Array.isArray(obj)) {
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
    const value = isPrototypePolluted(key) ? {} : mostNestedObj[key];

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

function isPrototypePolluted(key: any) {
  return /__proto__|constructor|prototype/.test(key);
}