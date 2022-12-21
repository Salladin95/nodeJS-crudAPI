declare const safeJsonParse: <T>(guard: (o: unknown) => o is T) => (text: string) => T;
export default safeJsonParse;
