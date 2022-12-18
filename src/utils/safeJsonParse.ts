const safeJsonParse =
  <T>(guard: (o: unknown) => o is T) =>
  (text: string): T | null => {
    try {
      const parsed = JSON.parse(text);
      if (!guard(parsed)) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  };

export default safeJsonParse;
