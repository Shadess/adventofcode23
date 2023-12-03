import { input1 } from "./constants";

const getNumberFromString = (input: string): number => {
  let leftIt = 0;
  let rightIt = input.length - 1;

  let leftVal = -1;
  let rightVal = -1;

  while (leftIt < rightIt && rightVal < 0) {
    if (leftVal < 0) {
      const num = parseInt(input[leftIt]);
      if (!isNaN(num)) leftVal = num;
      else leftIt++;
    } else {
      const rnum = parseInt(input[rightIt]);
      if (!isNaN(rnum)) rightVal = rnum;
      else rightIt--;
    }
  }

  if (leftVal < 0) leftVal = parseInt(input[leftIt]);
  if (rightVal < 0) rightVal = parseInt(input[leftIt]);

  return parseInt(`${leftVal}${rightVal}`);
};

export const runProblem1 = () => {
  const total = input1.reduce((runningSum, input) => {
    const strNum = getNumberFromString(input);
    return runningSum + strNum;
  }, 0);

  console.log(total);
};

export default runProblem1;
