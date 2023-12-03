import { input1 } from "./constants";

const stringNums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

enum Direction {
  Forward = 0,
  Backward = 1,
}

const validEnd = (
  input: string,
  end: number,
  direction: Direction
): boolean => {
  if (direction === Direction.Forward) return end <= input.length;
  else return end >= 0;
};

const getStrNumFromString = (
  input: string,
  startIndex: number,
  direction: Direction
) => {
  let end = direction === Direction.Forward ? startIndex + 1 : startIndex - 1;
  let value = -1;
  while (value < 0 && validEnd(input, end, direction)) {
    const subStr =
      direction === Direction.Forward
        ? input.slice(startIndex, end)
        : input.slice(end, startIndex + 1);
    if (Object.prototype.hasOwnProperty.call(stringNums, subStr)) {
      value = stringNums[subStr as keyof typeof stringNums];
    } else {
      direction === Direction.Forward ? end++ : end--;
    }
  }

  return value;
};

const getNumberFromString = (input: string): number => {
  let leftIt = 0;
  let rightIt = input.length - 1;

  let leftVal = -1;
  let rightVal = -1;

  while (leftIt < rightIt && rightVal < 0) {
    if (leftVal < 0) {
      const num = parseInt(input[leftIt]);
      if (!isNaN(num)) leftVal = num;
      else {
        const txtNum = getStrNumFromString(input, leftIt, Direction.Forward);
        if (txtNum > 0) leftVal = txtNum;
        else leftIt++;
      }
    } else {
      const rnum = parseInt(input[rightIt]);
      if (!isNaN(rnum)) rightVal = rnum;
      else {
        const txtNum = getStrNumFromString(input, rightIt, Direction.Backward);
        if (txtNum > 0) rightVal = txtNum;
        else rightIt--;
      }
    }
  }

  if (leftVal < 0) leftVal = parseInt(input[leftIt]);
  if (rightVal < 0) rightVal = parseInt(input[leftIt]);

  return parseInt(`${leftVal}${rightVal}`);
};

export const runProblem2 = () => {
  //   NOT - 55622
  const total = input1.reduce((runningSum, input) => {
    const strNum = getNumberFromString(input);
    return runningSum + strNum;
  }, 0);
  console.log(total);

  // TESTS
  //   console.log(getNumberFromString("2pkbv")); // 22
  //   console.log(getNumberFromString("zltbp8")); // 88
  //   console.log(getNumberFromString("oneight")); // 18
  //   console.log(getNumberFromString("one2eight")); // 18
  //   console.log(getNumberFromString("one2ight")); // 12
  //   console.log(getNumberFromString("mboneightgjjrxxxkmmhprxptqtvseven754gjjr")); // 14
  //   console.log(getNumberFromString("8l")); // 88
  //   console.log(getNumberFromString("7")); // 77
  //   console.log(getNumberFromString("3199")); // 39
  //   console.log(getNumberFromString("66")); // 66
  //   console.log(getNumberFromString("znvvmjktwoblr8")); // 28
  //   console.log(getNumberFromString("rsgmz7nine3")); // 73
  //   console.log(getNumberFromString("two")); // 22
};
