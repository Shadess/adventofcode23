import { fullInput, tester01 } from './input';
const isGearChar = (char: string) => {
  return char === '*';
};

const findLeadingNumber = (line: string, start: number): number => {
  let begIt = start;
  if (begIt < 0 || isNaN(parseInt(line[begIt]))) return 0;
  else {
    while (begIt >= 0 && !isNaN(parseInt(line[begIt]))) begIt--;
    const num = line.slice(begIt + 1, start + 1);
    return parseInt(num);
  }
};

const findTrailingNumber = (line: string, start: number): number => {
  let end = start;
  if (end === line.length || isNaN(parseInt(line[end]))) return 0;
  else {
    while (end < line.length && !isNaN(parseInt(line[end]))) end++;
    const num = line.slice(start, end);
    return parseInt(num);
  }
};

const findBotTopNumbers = (
  lineNum: number,
  input: string[],
  centerStart: number
): number[] => {
  if (lineNum < 0 || lineNum >= input.length) return [];

  const line2Check = input[lineNum];
  if (isNaN(parseInt(line2Check[centerStart]))) {
    // have a period just above so flank it bitch
    const numbers: number[] = [];
    const leader = findLeadingNumber(line2Check, centerStart - 1);
    if (leader) numbers.push(leader);
    const trailer = findTrailingNumber(line2Check, centerStart + 1);
    if (trailer) numbers.push(trailer);
    return numbers;
  } else {
    let leftStart = centerStart;
    let rightStart = centerStart;

    // lets flank out till not numbers
    while (leftStart > 0 && !isNaN(parseInt(line2Check[leftStart - 1])))
      leftStart--;
    while (
      rightStart <= line2Check.length - 1 &&
      !isNaN(parseInt(line2Check[rightStart + 1]))
    )
      rightStart++;

    const num = line2Check.slice(leftStart, rightStart + 1);
    return [parseInt(num)];
  }
};

const runThroughLines = (lineNum: number, input: string[]): number => {
  const theLine = input[lineNum];
  let count = 0;

  for (let i = 0; i < theLine.length; i++) {
    if (isGearChar(theLine[i])) {
      // found a potential gear
      let numbers: number[] = [];

      const lead = findLeadingNumber(theLine, i - 1);
      if (lead) numbers.push(lead);

      const trail = findTrailingNumber(theLine, i + 1);
      if (trail) numbers.push(trail);

      numbers = numbers.concat(findBotTopNumbers(lineNum - 1, input, i));
      numbers = numbers.concat(findBotTopNumbers(lineNum + 1, input, i));

      if (numbers.length == 2) {
        count += numbers[0] * numbers[1];
      }
    }
  }

  return count;
};

export const runProblem6 = () => {
  // 30496384 - is too low
  const testInput = fullInput;
  const total = testInput.reduce((prior, _, index) => {
    return prior + runThroughLines(index, testInput);
  }, 0);

  console.log(total);
};

export default runProblem6;
