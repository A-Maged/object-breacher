export const PATH_SEPERATOR = ".";

export function formatKeys(
  path: string | Array<string>,
  pathSeparator: string | undefined
) {
  if (typeof path !== "string" && !Array.isArray(path))
    throw Error("Path must be of type String or Array");

  return Array.isArray(path) ? path : path.split(pathSeparator || PATH_SEPERATOR);
}

export function isObject(value: any) {
  return value && typeof value === "object" && value.constructor === Object;
}
