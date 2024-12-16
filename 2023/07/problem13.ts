import * as fs from 'fs';
import * as readline from 'readline';

interface Round {
	bid: number;
	hand: string;
	type: HandType;
}

enum HandType {
	HighCard = 0,
	OnePair = 1,
	TwoPair = 2,
	ThreeKind = 3,
	FullHouse = 4,
	FourKind = 5,
	FiveKind = 6,
}

const has3OfKind = (hand: string): string | null => {
	const handArr = hand.split('');
	const numTry1 = handArr.filter((x) => x === hand[0]).length;
	const numTry2 = handArr.filter((y) => y === hand[1]).length;
	const numTry3 = handArr.filter((z) => z === hand[2]).length;

	if (numTry1 === 3) return hand[0];
	else if (numTry2 === 3) return hand[1];
	else if (numTry3 === 3) return hand[2];
	else return null;
};

const is5OfAKind = (hand: string): boolean => {
	return hand[0] === hand[1] && hand[0] === hand[2] && hand[0] === hand[3] && hand[0] === hand[4];
};

const is4OfAKind = (hand: string): boolean => {
	const handArr = hand.split('');
	const numTry1 = handArr.filter((x) => x === hand[0]).length;
	const numTry2 = handArr.filter((y) => y === hand[1]).length;

	return numTry1 === 4 || numTry2 === 4;
};

const is3OfAKind = (hand: string): boolean => {
	return !!has3OfKind(hand);
};

const isFullHouse = (hand: string): boolean => {
	const threeKind = has3OfKind(hand);
	if (!threeKind) return false;

	const handArr = hand.split('');
	const remainers = handArr.filter((x) => x !== threeKind);
	return remainers.length === 2 && remainers[0] === remainers[1];
};

const getPairs = (hand: string): string[] => {
	const pairs: string[] = [];
	const handArr = hand.split('');
	handArr.forEach((char) => {
		const count = handArr.filter((x) => x === char).length;
		if (count === 2 && !pairs.includes(char)) pairs.push(char);
	});
	return pairs;
};

const isTwoPair = (hand: string): boolean => {
	const pairs = getPairs(hand);
	return pairs.length === 2 && pairs[0] !== pairs[1];
};

const isOnePair = (hand: string): boolean => {
	const pairs = getPairs(hand);
	return pairs.length === 1;
};

const getHandType = (hand: string): HandType => {
	if (is5OfAKind(hand)) return HandType.FiveKind;
	else if (is4OfAKind(hand)) return HandType.FourKind;
	else if (isFullHouse(hand)) return HandType.FullHouse;
	else if (is3OfAKind(hand)) return HandType.ThreeKind;
	else if (isTwoPair(hand)) return HandType.TwoPair;
	else if (isOnePair(hand)) return HandType.OnePair;
	return HandType.HighCard;
};

const getCardValue = (card: string): number => {
	switch (card) {
		case 'A':
			return 14;
		case 'K':
			return 13;
		case 'Q':
			return 12;
		case 'J':
			return 11;
		case 'T':
			return 10;
		default:
			return parseInt(card);
	}
};

const compareHands = (a: Round, b: Round): boolean => {
	if (a.type !== b.type) return a.type > b.type;
	else {
		const aArr = a.hand.split('');
		const bArr = b.hand.split('');

		if (aArr[0] !== bArr[0]) return getCardValue(aArr[0]) > getCardValue(bArr[0]);
		else if (aArr[1] !== bArr[1]) return getCardValue(aArr[1]) > getCardValue(bArr[1]);
		else if (aArr[2] !== bArr[2]) return getCardValue(aArr[2]) > getCardValue(bArr[2]);
		else if (aArr[3] !== bArr[3]) return getCardValue(aArr[3]) > getCardValue(bArr[3]);
		else return getCardValue(aArr[4]) > getCardValue(bArr[4]);
	}
};

const getInsertionIndex = (rounds: Round[], hand: Round) => {
	let low = 0;
	let high = rounds.length;

	while (low < high) {
		let mid = (low + high) >>> 1;
		if (compareHands(hand, rounds[mid])) low = mid + 1;
		else high = mid;
	}

	return low;
};

export const runProblem13 = async () => {
	const stream = fs.createReadStream('./days/07/13input.txt');
	const lines = readline.createInterface({ input: stream, crlfDelay: Infinity });

	let rounds: Round[] = [];

	for await (const line of lines) {
		const lineSplit = line.split(' ');
		const newHand: Round = {
			bid: parseInt(lineSplit[1]),
			hand: lineSplit[0],
			type: getHandType(lineSplit[0]),
		};
		const insertIndex = getInsertionIndex(rounds, newHand);
		rounds = [...rounds.slice(0, insertIndex), newHand, ...rounds.slice(insertIndex)];
	}

	const total = rounds.reduce((sum, round, index) => {
		sum += (index + 1) * round.bid;
		return sum;
	}, 0);
	console.log(total);
};

export default runProblem13;
