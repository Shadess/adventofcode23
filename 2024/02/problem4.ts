import * as testInputs from './inputs02';
import { puzzleInput02 } from './puzzleInput';

function isSafe(levels: string[]): boolean {
	if (levels.length <= 1) return false;

	let numBad = 0;
	let numNegative = 0;
	let numPositive = 0;

	for (let i = 1; i < levels.length; i++) {
		const prev = parseInt(levels[i - 1], 10);
		const curr = parseInt(levels[i], 10);
		if (curr === prev || Math.abs(curr - prev) > 3) {
			numBad++;
		} else {
			curr - prev > 0 ? numPositive++ : numNegative++;
		}
	}

	const levelDiff = levels.length - 1 - Math.abs(numNegative - numPositive);
	numBad += levelDiff;
	return numBad === 0;
}

function getNumSafeReports(input: string): number {
	const reports = input.split('\n');
	let numSafe = 0;

	reports.forEach((report) => {
		const levels = report.split(' ');
		const baseIsSafe = isSafe(levels);

		if (baseIsSafe) {
			numSafe++;
		} else {
			for (let i = 0; i < levels.length; i++) {
				if (isSafe(levels.toSpliced(i, 1))) {
					numSafe++;
					break;
				}
			}
		}
	});

	return numSafe;
}

export default function runProblem4() {
	puzzleInput02.map((reports) => {
		const numSafe = getNumSafeReports(reports);
		console.log(`Safety in numbers: ${numSafe}`);
	});
}
