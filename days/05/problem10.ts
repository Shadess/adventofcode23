import {
	fertlizer2Water,
	humidity2Location,
	light2Temp,
	seed2Soil,
	seeds,
	soil2Fertilizer,
	temp2Humidity,
	water2Light,
} from './input';

enum Mappers {
	Seed = 0,
	Soil = 1,
	Fertilizer = 3,
	Water = 4,
	Light = 5,
	Temp = 6,
	Humidity = 7,
	Location = 8,
}

const transpile = (theSeeds: number[], mapType: Mappers): number[] => {
	if (mapType === Mappers.Location) return theSeeds;

	let mapper: number[][] = seed2Soil;
	switch (mapType) {
		case Mappers.Humidity:
			mapper = humidity2Location;
			break;
		case Mappers.Temp:
			mapper = temp2Humidity;
			break;
		case Mappers.Light:
			mapper = light2Temp;
			break;
		case Mappers.Water:
			mapper = water2Light;
			break;
		case Mappers.Fertilizer:
			mapper = fertlizer2Water;
			break;
		case Mappers.Soil:
			mapper = soil2Fertilizer;
			break;
		default:
			mapper = seed2Soil;
	}

	theSeeds.forEach((fSeed, index) => {
		let mappedSeed = fSeed;

		let mapped = false;
		let iterator = 0;
		while (!mapped && iterator < mapper.length) {
			const destStart = mapper[iterator][0];
			const srcStart = mapper[iterator][1];
			const rangeLen = mapper[iterator][2];

			if (fSeed >= srcStart && fSeed <= srcStart + rangeLen) {
				mappedSeed = destStart - srcStart + fSeed;
				mapped = true;
			}

			iterator++;
		}
		theSeeds[index] = mappedSeed;
	});

	return transpile(theSeeds, mapType + 1);
};

export const runProblem10 = () => {
	const fullSeeds: number[] = [];
	for (let i = 4; i < 6; i += 2) {
		const roundSeeds: number[] = [];
		for (let j = 0; j < seeds[i + 1]; j++) roundSeeds.push(seeds[i] + j);

		const locs = transpile(roundSeeds, Mappers.Seed);

		const ordered = locs.sort((a, b) => a - b);
		// console.log(ordered);
		// console.log('==============');
		// console.log(ordered[0]);
		fullSeeds.push(ordered[0]);
	}

	// console.log(fullSeeds);
	const fullOrder = fullSeeds.sort((a, b) => a - b);
	console.log(fullOrder[0]);
};

export default runProblem10;
