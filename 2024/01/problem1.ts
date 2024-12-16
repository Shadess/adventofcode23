import { testInput01A } from './inputs01';
import { puzzleInput01 } from './puzzleInput';

export default function runProblem1() {
	const leftList: number[] = [];
	const rightList: number[] = [];

	const split = puzzleInput01.split('\n');
	// Go through pairs and add in order to arrays
	split.map((pair) => {
		const pairSplit = pair.split('   ');
		leftList.push(parseInt(pairSplit[0], 10));
		rightList.push(parseInt(pairSplit[1], 10));
	});
	leftList.sort();
	rightList.sort();

	let sum = 0;
	leftList.forEach((left, idx) => {
		sum += Math.abs(left - rightList[idx]);
	});

	console.log(sum);
}
