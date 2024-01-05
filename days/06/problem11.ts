import { oneRaceInput } from './input11';

export const runProblem11 = () => {
	const input = oneRaceInput;

	let totalWins = 1;

	const numRaces = input.time.length;
	for (let i = 0; i < numRaces; i++) {
		const time = input.time[i];
		const distance = input.distance[i];
		let numWins = 0;

		let chargeTime = 1;
		while (chargeTime < time) {
			const chargeDist = chargeTime * (time - chargeTime);
			if (chargeDist > distance) numWins++;
			chargeTime++;
		}

		console.log(`[${i}] Wins: ${numWins}`);
		totalWins *= numWins;
	}

	console.log(totalWins);
};

export default runProblem11;
