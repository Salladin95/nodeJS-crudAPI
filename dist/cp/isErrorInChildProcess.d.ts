export type CPError = {
    errorMessage: string;
};
declare const isErrorInChildProcc: (msg: unknown) => msg is CPError;
export default isErrorInChildProcc;
