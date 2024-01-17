import { getLinesFromFile } from '../utils';

const countWays = (line: string, runs: readonly number[]): number => {
	if (line.length === 0) {
		// end of the road jack
		return runs.length === 0 ? 1 : 0;
	}

	if (runs.length === 0) {
	}
	return 0;
};

const getNumArrangements4Line = (line: string) => {
	const [data, order] = line.split(' ');
	const nums = order.split(',').map((x) => parseInt(x, 10));

	// const fullData = [data, data, data, data, data].join('?');
	// const fullNums = [...nums, ...nums, ...nums, ...nums, ...nums];

	console.log(data);
	console.log(nums);
};

export const runProblem23 = async () => {
	const lines = getLinesFromFile('./days/12/input.test.txt');

	// for await (const line of lines) {
	// 	console.log(line);
	// }

	getNumArrangements4Line('???.### 1,1,3');
};

export default runProblem23;
