import { getLinesFromFile } from '../utils';

interface Position {
	a: number;
	b: number;
}

const matrix: string[][] = [];
const priorPos: Position = { a: 0, b: 0 };
const currPos: Position = { a: 0, b: 0 };

const setPriorToCurrent = () => {
	priorPos.a = currPos.a;
	priorPos.b = currPos.b;
};

const goDown = () => {
	setPriorToCurrent();
	currPos.a = currPos.a + 1;
};

const goLeft = () => {
	setPriorToCurrent();
	currPos.b = currPos.b - 1;
};

const goRight = () => {
	setPriorToCurrent();
	currPos.b = currPos.b + 1;
};

const goUp = () => {
	setPriorToCurrent();
	currPos.a = currPos.a - 1;
};

const isInBounds = (): boolean => {
	return !(
		currPos.a < 0 ||
		currPos.b < 0 ||
		currPos.a >= matrix.length ||
		currPos.b >= matrix[0].length ||
		matrix[currPos.a][currPos.b] === '.'
	);
};

const stepPath = (count: number): number => {
	// End of loop
	if (
		currPos.a < 0 ||
		currPos.b < 0 ||
		currPos.a >= matrix.length ||
		currPos.b >= matrix[0].length ||
		matrix[currPos.a][currPos.b] === '.'
	)
		return -1;

	const curr = matrix[currPos.a][currPos.b];
	if (curr === 'S') return count;

	if (curr === '|') {
		currPos.a > priorPos.a ? goDown() : goUp();
	} else if (curr === '-') {
		currPos.b > priorPos.b ? goRight() : goLeft();
	} else if (curr === 'L') {
		if (currPos.b === priorPos.b) goRight();
		else goUp();
	} else if (curr === 'J') {
		if (currPos.b === priorPos.b) goLeft();
		else goUp();
	} else if (curr === '7') {
		if (currPos.b === priorPos.b) goLeft();
		else goDown();
	} else if (curr === 'F') {
		if (currPos.b === priorPos.b) goRight();
		else goDown();
	}

	return stepPath(count + 1);
};

export const runProblem19 = async () => {
	const lines = getLinesFromFile('./days/10/input.txt');

	let foundS = false;
	let lineStart = 0;
	let startIndex = 0;

	for await (const line of lines) {
		const arr = line.split('');
		matrix.push(arr);

		if (!foundS && arr.includes('S')) {
			foundS = true;
			startIndex = arr.findIndex((x) => x === 'S');
		} else if (!foundS) {
			lineStart++;
		}
	}

	let totalSteps = 1;

	priorPos.a = lineStart;
	priorPos.b = startIndex;

	const topPathStart = { a: lineStart - 1, b: startIndex };
	const leftPathStart = { a: lineStart, b: startIndex - 1 };
	const botPathStart = { a: lineStart + 1, b: startIndex };
	const rightPathStart = { a: lineStart, b: startIndex + 1 };

	const topPathSymbol = matrix[topPathStart.a][topPathStart.b];
	const leftPathSymbol = matrix[leftPathStart.a][leftPathStart.b];
	const botPathSymbol = matrix[botPathStart.a][botPathStart.b];
	const rightPathSymbol = matrix[rightPathStart.a][rightPathStart.b];

	if (topPathSymbol === '|' || topPathSymbol === '7' || topPathSymbol === 'F') {
		currPos.a = topPathStart.a;
		currPos.b = topPathStart.b;
		// totalSteps = stepPath(1);
	} else if (leftPathSymbol === '-' || leftPathSymbol === 'L' || leftPathSymbol === 'F') {
		currPos.a = leftPathStart.a;
		currPos.b = leftPathStart.b;
		// totalSteps = stepPath(1);
	} else if (botPathSymbol === '|' || botPathSymbol === 'L' || botPathSymbol === 'J') {
		currPos.a = botPathStart.a;
		currPos.b = botPathStart.b;
		// totalSteps = stepPath(1);
	} else if (rightPathSymbol === '-' || rightPathSymbol === 'J' || rightPathSymbol === '7') {
		currPos.a = rightPathStart.a;
		currPos.b = rightPathStart.b;
		// totalSteps = stepPath(1);
	}

	while (matrix[currPos.a][currPos.b] !== 'S' && isInBounds()) {
		const curr = matrix[currPos.a][currPos.b];

		if (curr === '|') {
			currPos.a > priorPos.a ? goDown() : goUp();
		} else if (curr === '-') {
			currPos.b > priorPos.b ? goRight() : goLeft();
		} else if (curr === 'L') {
			if (currPos.b === priorPos.b) goRight();
			else goUp();
		} else if (curr === 'J') {
			if (currPos.b === priorPos.b) goLeft();
			else goUp();
		} else if (curr === '7') {
			if (currPos.b === priorPos.b) goLeft();
			else goDown();
		} else if (curr === 'F') {
			if (currPos.b === priorPos.b) goRight();
			else goDown();
		}

		totalSteps++;
	}

	console.log(totalSteps / 2);
};

export default runProblem19;
