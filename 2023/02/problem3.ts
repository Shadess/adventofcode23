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

  const numGamesFailed = rounds.filter((x) => {
    const gems = x.split(", ");
    const oneGameFails = gems.reduce((prior, item) => {
      if (prior) return prior;

      const itemSplit = item.split(" ");
      const count = parseInt(itemSplit[0]);
      const colour = itemSplit[1];
      if (colour === "blue") return count > MAX_BLUE;
      else if (colour === "red") return count > MAX_RED;
      else return count > MAX_GREEN;
    }, false);

    return oneGameFails;
  });
  return numGamesFailed.length > 0 ? 0 : gameNum;
};

export const runProblem3 = () => {
  const tester = games[0];

  // Run this
  //   console.log(canRunGame(tester));
  const total = games.reduce((count, game) => {
    return count + canRunGame(game);
  }, 0);

  console.log(total);
};

export default runProblem3;
