import * as fs from 'fs';
import * as readline from 'readline';

export const getLinesFromFile = (path: string): readline.Interface => {
	const stream = fs.createReadStream(path);
	return readline.createInterface({ input: stream, crlfDelay: Infinity });
};

export function memoize<Args extends unknown[], Result>(
	func: (...args: Args) => Result
): (...args: Args) => Result {
	const stored = new Map<string, Result>();

	return (...args) => {
		const k = JSON.stringify(args);
		if (stored.has(k)) {
			return stored.get(k)!;
		}
		const result = func(...args);
		stored.set(k, result);
		return result;
	};
}
