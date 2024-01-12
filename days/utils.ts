import * as fs from 'fs';
import * as readline from 'readline';

export const getLinesFromFile = (path: string): readline.Interface => {
	const stream = fs.createReadStream(path);
	return readline.createInterface({ input: stream, crlfDelay: Infinity });
};
