import { getLinesFromFile } from '../utils';

const getNextVal = (vals: number[]): number => {
	const areAllZed = vals.every((x) => x === 0);

	if (areAllZed) return 0; // base case

	const newVals: number[] = [];
	for (let i = 1; i < vals.length; i++) {
		newVals.push(vals[i] - vals[i - 1]);
	}
	return vals[vals.length - 1] + getNextVal(newVals);
};

const getPriorVal = (vals: number[]): number => {
	const areAllZed = vals.every((x) => x === 0);

	if (areAllZed) return 0; // base case

	const newVals: number[] = [];
	for (let i = 1; i < vals.length; i++) {
		newVals.push(vals[i] - vals[i - 1]);
	}
	return vals[0] - getPriorVal(newVals);
};

export const runProblem17 = async () => {
	const lines = getLinesFromFile('./days/09/input.txt');

	let total = 0;
	for await (const line of lines) {
		const vals = line.split(' ').map((x) => parseInt(x));
		// total += getNextVal(vals);
		total += getPriorVal(vals);
	}

	console.log(total);
};

export default runProblem17;
