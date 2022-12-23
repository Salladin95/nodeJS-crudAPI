import { unExpectedJSON } from './constants';

const safeJsonParse =
  <T>(guard: (o: unknown) => o is T) =>
  (text: string): T => {
    try {
      const parsed = JSON.parse(text);
      if (!guard(parsed)) {
        throw new Error(unExpectedJSON);
      }
      return parsed;
    } catch (err) {
      throw err;
    }
  };

export default safeJsonParse;
