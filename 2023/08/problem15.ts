import * as fs from 'fs';
import * as readline from 'readline';

interface Directions {
	left: string;
	right: string;
}

export const getSteps = (
	location: string,
	instructions: string[],
	map: Map<string, Directions>
): number => {
	let iterator = 0;
	let steps = 0;
	while (location[2] !== 'Z') {
		const currentMap = map.get(location);
		if (!currentMap) throw new Error(`No location found for: ${location}`);

		location = instructions[iterator] === 'L' ? currentMap.left : currentMap.right;
		steps++;
		iterator = iterator == instructions.length - 1 ? 0 : iterator + 1;
	}
	return steps;
};

export const runProblem15 = async () => {
	const stream = fs.createReadStream('./days/08/input.txt');
	const lines = readline.createInterface({ input: stream, crlfDelay: Infinity });

	let instructionsString = '';
	const aPaths: string[] = [];

	const map: Map<string, Directions> = new Map<string, Directions>();
	let i = 0;
	for await (const line of lines) {
		if (i === 0) instructionsString = line;
		else if (line) {
			const break1 = line.split(' = ');
			const locName = break1[0];
			const dirBreak = break1[1].split(', ');
			map.set(locName, {
				left: dirBreak[0].slice(1),
				right: dirBreak[1].slice(0, dirBreak[1].length - 1),
			});

			const arr = locName.split('');
			if (arr[arr.length - 1] === 'A') aPaths.push(locName);
		}
		i++;
	}

	const instructions = instructionsString.split('');
	const steps = aPaths.map((x) => getSteps(x, instructions, map));

	const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
	const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
	const theNumber = steps.reduce(lcm);
	console.log(theNumber);
};

export default runProblem15;
