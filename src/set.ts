import { isObject, PATH_SEPARATOR } from "./utils";

type TSetOptions = {
    pathSeparator?: string;
};

type TObjOrPath = { [key: string]: any } | string | Array<string>;

export function set(
    obj: TObjOrPath,
    path: TObjOrPath,
    userValue: string | object = {},
    options: TSetOptions = {}
) {
    /* Support having no obj */
    if (arguments.length < 3) {
        userValue = path;
        path = obj;
        obj = {};
    }

    let keys = Array.isArray(path)
        ? path
        : path.split(options.pathSeparator || PATH_SEPARATOR);
    let mostNestedObj: any = obj;
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
