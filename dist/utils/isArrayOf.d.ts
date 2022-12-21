declare const isArrayOf: <T>(guard: (dataT: unknown) => dataT is T) => (data: unknown) => data is T[];
export default isArrayOf;
