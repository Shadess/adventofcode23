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

const transpile = (theSeeds: number[][], mapType: Mappers): number[][] => {
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

	const mappedSeeds: number[][] = [];
	theSeeds.forEach((fSeed) => {
		let startSeed = fSeed;

		mapper.every((ranger) => {
			const differ = ranger[0] - ranger[1];
			const srcRange = [ranger[1], ranger[1] + ranger[2] - 1];

			if (startSeed[0] >= srcRange[0] && startSeed[1] <= srcRange[1]) {
				// entire range is mapped here
				mappedSeeds.push([startSeed[0] + differ, startSeed[1] + differ]);
				startSeed = [];
				return false; // break the loop
			} else if (startSeed[0] >= srcRange[0] && startSeed[0] <= srcRange[1]) {
				// beggining of range is mapped
				mappedSeeds.push([startSeed[0] + differ, srcRange[1] + differ]);
				startSeed = [srcRange[1] + 1, startSeed[1]];
			} else if (startSeed[1] <= srcRange[1] && startSeed[1] >= srcRange[0]) {
				// end of range is mapped
				mappedSeeds.push([srcRange[0] + differ, startSeed[1] + differ]);
				startSeed = [startSeed[0], srcRange[0] - 1];
			}

			return true; // this keeps the loop running
		});

		// Push any remaining unmapped values
		if (startSeed.length > 0) mappedSeeds.push(startSeed);
	});

	return transpile(mappedSeeds, mapType + 1);
};

export const runProblem10 = () => {
	const startingSeeds: number[][] = [];
	for (let i = 0; i < seeds.length; i += 2) {
		startingSeeds.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
	}

	const mappedSeeds = transpile(startingSeeds, Mappers.Seed);
	const lowest = mappedSeeds.reduce((sum, seed) => {
		return (sum === -1 || seed[0] < sum) && seed[0] != 0 ? seed[0] : sum;
	}, -1);
	console.log(lowest);
};

export default runProblem10;
