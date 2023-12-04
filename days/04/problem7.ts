import { fullInput } from './input';

const getPointValueFromCard = (input: string) => {
	const firstSplit = input.split(': ');
	const secondSplit = firstSplit[1].split(' | ');
	const winningNumbers = secondSplit[0].split(' ');
	const cardNumbers = secondSplit[1].split(' ');

	let pointValue = 0;

	cardNumbers.map((num) => {
		if (num && winningNumbers.includes(num)) {
			pointValue = pointValue === 0 ? 1 : pointValue * 2;
		}
	});

	return pointValue;
};

export const runProblem7 = () => {
	console.log('hey there');
	const input = fullInput;
	const total = input.reduce((sum, card) => {
		const cardPV = getPointValueFromCard(card);
		return sum + cardPV;
	}, 0);

	console.log(total);
};

export default runProblem7;
