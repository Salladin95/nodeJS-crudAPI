const isObject = (obj: unknown): obj is Record<string, unknown> => obj instanceof Object;

export default isObject;
