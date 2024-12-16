import { getLinesFromFile } from '../utils';

const EMPTY_GALAXY_MULTIPLIER = 1000000 - 1;

interface Galaxy {
	col: number;
	row: number;
}

const matrix: string[][] = [];
const galaxyList: Galaxy[] = [];
const emptyRows: number[] = [];
const emptyCols: number[] = [];

const getNumberEmpty = (a: number, b: number, mapper: number[]): number => {
	let start = a;
	let end = b;
	let count = 0;

	if (b < a) {
		start = b;
		end = a;
	}

	for (let i = start + 1; i < end; i++) {
		if (mapper.includes(i)) count++;
	}

	return count;
};

export const runProblem22 = async () => {
	const lines = getLinesFromFile('./days/11/input.txt');

	let lineCount = 0;
	for await (const line of lines) {
		const arr = line.split('');
		matrix.push(arr);

		if (!arr.includes('#')) emptyRows.push(lineCount);
		lineCount++;
	}

	for (let i = 0; i < matrix[0].length; i++) {
		let clear = true;
		for (let k = 0; k < matrix.length && clear; k++) {
			clear = matrix[k][i] === '.';
		}

		if (clear) emptyCols.push(i);
	}

	// Add our galaxies to a list to loop through later
	for (let m = 0; m < matrix.length; m++) {
		const arr = matrix[m];
		for (let p = 0; p < arr.length; p++) {
			if (arr[p] === '#') {
				galaxyList.push({ col: p, row: m });
			}
		}
	}

	// console.log(getNumberEmpty(3, 0, emptyCols));
	// console.log(emptyCols);
	// console.log(emptyRows);
	// matrix.map((x) => console.log(x.join('')));
	// console.log(galaxyList);

	let total = 0;
	for (let i = 0; i < galaxyList.length; i++) {
		for (let j = i + 1; j < galaxyList.length; j++) {
			const numEmptyRows = getNumberEmpty(galaxyList[i].row, galaxyList[j].row, emptyRows);
			const numEmptyCols = getNumberEmpty(galaxyList[i].col, galaxyList[j].col, emptyCols);

			const length =
				Math.abs(galaxyList[i].col - galaxyList[j].col) +
				Math.abs(galaxyList[i].row - galaxyList[j].row) +
				numEmptyRows * EMPTY_GALAXY_MULTIPLIER +
				numEmptyCols * EMPTY_GALAXY_MULTIPLIER;
			// console.log(
			// 	`Length of Galaxy${i + 1} to Galaxy${
			// 		j + 1
			// 	} = ${length} || NumEmptyRows: ${numEmptyRows} | NumEmptyCols: ${numEmptyCols}`
			// );
			total += length;
		}
	}

	console.log(total);
};

export default runProblem22;
