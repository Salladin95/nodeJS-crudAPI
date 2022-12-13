import { badJsonMessage } from './constants';

const safeJsonParse =
	<T>(guard: (o: unknown) => o is T) =>
	(text: string): T | null => {
			const parsed = JSON.parse(text);
			if (!guard(parsed)) {
				return null;
			}
			return parsed;
	};

export default safeJsonParse;
