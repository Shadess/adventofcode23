import { testInput01A } from './inputs01';
import { puzzleInput01 } from './puzzleInput';

export default function runProblem1() {
	const leftList: number[] = [];
	// using map instead
	const rightList = new Map<number, number>();

	const split = puzzleInput01.split('\n');
	// Go through pairs and add in order to arrays
	split.map((pair) => {
		const pairSplit = pair.split('   ');
		leftList.push(parseInt(pairSplit[0], 10));

		const right = parseInt(pairSplit[1], 10);
		const rightCount = rightList.get(right);
		if (rightCount) {
			rightList.set(right, rightCount + 1);
		} else {
			rightList.set(right, 1);
		}
	});

	let sum = 0;
	leftList.forEach((left) => {
		sum += rightList.has(left) ? rightList.get(left)! * left : 0;
	});

	console.log(sum);
}
