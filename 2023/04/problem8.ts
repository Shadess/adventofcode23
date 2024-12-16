import { fullInput } from './input';

type CardObject = { [key: number]: number };

const getNumMatches = (input: string) => {
	const cardSplit = input.split(' | ');
	const winningNumbers = cardSplit[0].split(' ');
	const cardNumbers = cardSplit[1].split(' ');

	const winners = cardNumbers.filter((num) => {
		return num && winningNumbers.includes(num);
	});

	return winners.length;
};

const setInitialCardProperty = (obj: CardObject, prop: number) => {
	if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
		obj[prop] = 0;
	}
};

export const runProblem8 = () => {
	const cardCounts: CardObject = {};

	const input = fullInput;
	input.map((card) => {
		const cardSplit = card.split(':');
		const nameSplit = cardSplit[0].split('Card ');
		const cardNum = parseInt(nameSplit[1]);
		const numMatches = getNumMatches(cardSplit[1]);

		setInitialCardProperty(cardCounts, cardNum);
		cardCounts[cardNum]++;

		let counter = cardNum;
		for (let i = 0; i < numMatches; i++) {
			counter++;
			setInitialCardProperty(cardCounts, counter);
			cardCounts[counter] += 1 * cardCounts[cardNum];
		}
	});

	const total = Object.entries(cardCounts).reduce((sum, [_, value]) => {
		return sum + value;
	}, 0);

	console.log(total);
};

export default runProblem8;
