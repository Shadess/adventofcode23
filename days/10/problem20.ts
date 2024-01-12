import { getLinesFromFile } from '../utils';

interface Position {
	a: number;
	b: number;
}

const matrix: string[][] = [];
const vertices: Position[] = [];
const priorPos: Position = { a: 0, b: 0 };
const currPos: Position = { a: 0, b: 0 };
let numVerticalPipes = 0;

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

export const runProblem20 = async () => {
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
	} else if (leftPathSymbol === '-' || leftPathSymbol === 'L' || leftPathSymbol === 'F') {
		currPos.a = leftPathStart.a;
		currPos.b = leftPathStart.b;
	} else if (botPathSymbol === '|' || botPathSymbol === 'L' || botPathSymbol === 'J') {
		currPos.a = botPathStart.a;
		currPos.b = botPathStart.b;
	} else if (rightPathSymbol === '-' || rightPathSymbol === 'J' || rightPathSymbol === '7') {
		currPos.a = rightPathStart.a;
		currPos.b = rightPathStart.b;
	}

	let totalSteps = 1;

	vertices.push({ a: lineStart, b: startIndex });
	while (matrix[currPos.a][currPos.b] !== 'S' && isInBounds()) {
		const curr = matrix[currPos.a][currPos.b];

		if (curr === '|') {
			numVerticalPipes++;
			currPos.a > priorPos.a ? goDown() : goUp();
		} else if (curr === '-') {
			currPos.b > priorPos.b ? goRight() : goLeft();
		} else if (curr === 'L') {
			vertices.push({ a: currPos.a, b: currPos.b });
			if (currPos.b === priorPos.b) goRight();
			else goUp();
		} else if (curr === 'J') {
			vertices.push({ a: currPos.a, b: currPos.b });
			if (currPos.b === priorPos.b) goLeft();
			else goUp();
		} else if (curr === '7') {
			vertices.push({ a: currPos.a, b: currPos.b });
			if (currPos.b === priorPos.b) goLeft();
			else goDown();
		} else if (curr === 'F') {
			vertices.push({ a: currPos.a, b: currPos.b });
			if (currPos.b === priorPos.b) goRight();
			else goDown();
		}

		totalSteps++;
	}

	let sum = 0;
	vertices.push({ a: lineStart, b: startIndex });

	for (let i = 0; i < vertices.length - 1; i++) {
		sum += (vertices[i + 1].a + vertices[i].a) * (vertices[i + 1].b - vertices[i].b);
	}

	const area = sum / 2;
	console.log(area - totalSteps / 2 + 1);
};

export default runProblem20;
