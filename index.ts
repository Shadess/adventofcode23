import runProblem1 from "./days/01/problem1";
import { runProblem2 } from "./days/01/problem2";
import runProblem3 from "./days/02/problem3";
import runProblem4 from "./days/02/problem4";

if (process.argv.length <= 3) {
  console.error("Expected a day and problem to run.");
}

let day = 1;
let problem = 1;

if (process.argv[2] === "-d") {
  day = parseInt(process.argv[3]);
  problem = parseInt(process.argv[5]);
} else {
  day = parseInt(process.argv[5]);
  problem = parseInt(process.argv[3]);
}

if (day === 1 && problem === 1) runProblem1();
else if (day === 1 && problem === 2) runProblem2();
else if (day === 2 && problem === 1) runProblem3();
else if (day === 2 && problem === 2) runProblem4();
