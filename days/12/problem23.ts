import { getLinesFromFile, memoize } from '../utils';

const summer = (runs: readonly number[]): number => {
	return runs.reduce((sum, x) => sum + x, 0);
};

const countWays = memoize((line: string, runs: readonly number[]): number => {
	if (line.length === 0) {
		// end of the road jack
		// if out of runs than we found a way, otherwise no
		return runs.length === 0 ? 1 : 0;
	}

	if (runs.length === 0) {
		// we've put in all our numbers
		// if there are still # to contain numbers
		// well than 0
		// otherwise we good
		return line.includes('#') ? 0 : 1;
	}

	if (line.length < summer(runs) + runs.length - 1) {
		// line is not long enough for all the runs
		return 0;
	}

	if (line[0] === '.') {
		// keep going
		return countWays(line.slice(1), runs);
	} else if (line[0] === '#') {
		const [run, ...leftoverRuns] = runs;

		for (let i = 0; i < run; i++) {
			if (line[i] === '.') {
				// not enough #'s to fill in
				return 0;
			}
		}

		if (line[run] === '#') {
			// this run doesn't fill in all the #'s so not valid
			return 0;
		}

		// move forward with rest
		return countWays(line.slice(run + 1), leftoverRuns);
	}

	// Found a ? so lets do runs of picking this spot and not picking it
	return countWays('#' + line.slice(1), runs) + countWays('.' + line.slice(1), runs);
});

const getNumArrangements4Line = (line: string): number => {
	const [data, order] = line.split(' ');
	const nums = order.split(',').map((x) => parseInt(x, 10));

	const fullData = [data, data, data, data, data].join('?');
	const fullNums = [...nums, ...nums, ...nums, ...nums, ...nums];

	const lineTotal = countWays(fullData, fullNums);
	// console.log(lineTotal);
	return lineTotal;
};

export const runProblem23 = async () => {
	const lines = getLinesFromFile('./days/12/input.txt');

	let total = 0;
	for await (const line of lines) {
		total += getNumArrangements4Line(line);
	}
	console.log('-----');
	console.log(total);
};

export default runProblem23;
