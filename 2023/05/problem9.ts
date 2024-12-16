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

const transpile = (seed: number, mapper: number[][]): number => {
	let mappedSeed = seed;

	let mapped = false;
	let iterator = 0;
	while (!mapped && iterator < mapper.length) {
		const destStart = mapper[iterator][0];
		const srcStart = mapper[iterator][1];
		const rangeLen = mapper[iterator][2];

		if (seed >= srcStart && seed <= srcStart + rangeLen) {
			mappedSeed = destStart - srcStart + seed;
			mapped = true;
		}

		iterator++;
	}

	return mappedSeed;
};

export const runProblem9 = () => {
	const soils = seeds.map((seed) => {
		return transpile(seed, seed2Soil);
	});
	const fertilizers = soils.map((soil) => {
		return transpile(soil, soil2Fertilizer);
	});
	const waters = fertilizers.map((fert) => {
		return transpile(fert, fertlizer2Water);
	});
	const lights = waters.map((water) => {
		return transpile(water, water2Light);
	});
	const temps = lights.map((light) => {
		return transpile(light, light2Temp);
	});
	const humids = temps.map((temp) => {
		return transpile(temp, temp2Humidity);
	});
	const locs = humids.map((hum) => {
		return transpile(hum, humidity2Location);
	});

	console.log(locs.sort((a, b) => a - b));
};

export default runProblem9;
