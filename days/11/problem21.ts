import { getLinesFromFile } from '../utils';

interface Galaxy {
	col: number;
	row: number;
}

const matrix: string[][] = [];
const galaxyList: Galaxy[] = [];

export const runProblem21 = async () => {
	const lines = getLinesFromFile('./days/11/input.txt');

	for await (const line of lines) {
		const arr = line.split('');
		matrix.push(arr);

		if (!arr.includes('#')) matrix.push(arr);
	}

	for (let i = 0; i < matrix[0].length; i++) {
		let clear = true;
		for (let k = 0; k < matrix.length && clear; k++) {
			clear = matrix[k][i] === '.';
		}

		if (clear) {
			for (let j = 0; j < matrix.length; j++) {
				const newLine = [...matrix[j].slice(0, i), '.', ...matrix[j].slice(i)];
				matrix[j] = newLine;
			}
			i++;
		}
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

	// matrix.map((x) => console.log(x.join('')));
	// console.log(galaxyList);

	let total = 0;
	for (let i = 0; i < galaxyList.length; i++) {
		for (let j = i + 1; j < galaxyList.length; j++) {
			const length =
				Math.abs(galaxyList[i].col - galaxyList[j].col) +
				Math.abs(galaxyList[i].row - galaxyList[j].row);
			// console.log(`Length of Galaxy${i + 1} to Galaxy${j + 1} = ${length}`);
			total += length;
		}
	}

	console.log(total);
};

export default runProblem21;
