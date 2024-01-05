interface TestInputFormat {
	distance: number[];
	time: number[];
}

export const testInput: TestInputFormat = {
	time: [7, 15, 30],
	distance: [9, 40, 200],
};

export const input: TestInputFormat = {
	time: [48, 87, 69, 81],
	distance: [255, 1288, 1117, 1623],
};

export const oneRaceInputTest: TestInputFormat = {
	time: [71530],
	distance: [940200],
};

export const oneRaceInput: TestInputFormat = {
	time: [48876981],
	distance: [255128811171623],
};
