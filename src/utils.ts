export const PATH_SEPERATOR = '.';

export function isObject(value: any) {
  return (
    value && typeof value === 'object' && value.constructor === Object
  );
}
