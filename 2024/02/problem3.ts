import * as testInputs from './inputs02';
import { puzzleInput02 } from './puzzleInput';

export default function runProblem3() {
	const reports = puzzleInput02[0].split('\n');
	let numSafe = 0;

	reports.forEach((report) => {
		const levels = report.split(' ');
		if (levels.length > 1) {
			const isIncreasing = parseInt(levels[1], 10) - parseInt(levels[0], 10) > 0;
			let i = 1;
			for (i; i < levels.length; i++) {
				const prev = parseInt(levels[i - 1], 10);
				const curr = parseInt(levels[i], 10);

				if (
					curr === prev || // same (no gradation)
					Math.abs(curr - prev) > 3 || // gradation is unsafe
					// swap in inc/dec
					(isIncreasing && curr - prev < 0) ||
					(!isIncreasing && curr - prev > 0)
				) {
					break;
				}
			}
			if (i === levels.length) {
				// safe run
				numSafe += 1;
			}
		}
	});

	console.log(`Safety in numbers: ${numSafe}`);
}
