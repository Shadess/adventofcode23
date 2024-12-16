import { games } from "./constants";

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const getGameNum = (input: string): number => {
  const gameSplit = input.split("Game ");
  return parseInt(gameSplit[1]);
};

const canRunGame = (input: string): number => {
  const split = input.split(": ");
  const gameNum = getGameNum(split[0]);
  const rounds = split[1].split("; ");
  //   console.log(rounds);

  let minBlue = 0;
  let minRed = 0;
  let minGreen = 0;

  rounds.forEach((round) => {
    const gems = round.split(", ");
    gems.forEach((item) => {
      const itemSplit = item.split(" ");
      const count = parseInt(itemSplit[0]);
      const colour = itemSplit[1];

      if (colour === "blue" && count > minBlue) minBlue = count;
      else if (colour === "red" && count > minRed) minRed = count;
      else if (colour === "green" && count > minGreen) minGreen = count;
    });
  });

  return minBlue * minRed * minGreen;
};

export const runProblem4 = () => {
  const tester = "Game 5: 1 red, 1 blue, 1 green; 1 red, 1 blue, 1 green";

  // Run this
  // NOT 93290
  //   console.log(canRunGame(tester));
  const total = games.reduce((count, game) => {
    return count + canRunGame(game);
  }, 0);

  console.log(total);
};

export default runProblem4;
