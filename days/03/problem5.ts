import { fullInput } from './input';
const isSpecialChar = (char: string) => {
  return char !== '.' && isNaN(parseInt(char));
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
): number => {
  if (lineNum < 0 || lineNum >= input.length) return 0;

  const line2Check = input[lineNum];
  if (isNaN(parseInt(line2Check[centerStart]))) {
    // have a period just above so flank it bitch
    return (
      findLeadingNumber(line2Check, centerStart - 1) +
      findTrailingNumber(line2Check, centerStart + 1)
    );
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
    return parseInt(num);
  }
};

const runThroughLines = (lineNum: number, input: string[]): number => {
  const theLine = input[lineNum];
  let count = 0;

  for (let i = 0; i < theLine.length; i++) {
    if (isSpecialChar(theLine[i])) {
      // found a special character lets check around it
      count += findLeadingNumber(theLine, i - 1);
      count += findTrailingNumber(theLine, i + 1);
      count += findBotTopNumbers(lineNum - 1, input, i);
      count += findBotTopNumbers(lineNum + 1, input, i);
    }
  }

  return count;
};

export const runProblem5 = () => {
  // const testInput = [fullInput[0], fullInput[1]];
  //   const testInput = ['487.299.300.1123.123', '..#.....300.1123.123'];
  const testInput = fullInput;
  const total = testInput.reduce((prior, _, index) => {
    return prior + runThroughLines(index, testInput);
  }, 0);

  console.log(total);
};

export default runProblem5;
