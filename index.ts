import runProblem1 from './days/01/problem1';
import { runProblem2 } from './days/01/problem2';
import runProblem3 from './days/02/problem3';
import runProblem4 from './days/02/problem4';
import runProblem5 from './days/03/problem5';
import runProblem6 from './days/03/problem6';
import { runProblem7 } from './days/04/problem7';
import runProblem8 from './days/04/problem8';

if (process.argv.length <= 3) {
	console.error('Expected a day and problem to run.');
}

let day = 1;
let problem = 1;

if (process.argv[2] === '-d') {
	day = parseInt(process.argv[3]);
	problem = parseInt(process.argv[5]);
} else {
	day = parseInt(process.argv[5]);
	problem = parseInt(process.argv[3]);
}

if (problem > 2) console.error('Problem should never be greater than 2.');

if (day === 1 && problem === 1) runProblem1();
else if (day === 1 && problem === 2) runProblem2();
else if (day === 2 && problem === 1) runProblem3();
else if (day === 2 && problem === 2) runProblem4();
else if (day === 3 && problem === 1) runProblem5();
else if (day === 3 && problem === 2) runProblem6();
else if (day === 4 && problem === 1) runProblem7();
else if (day === 4 && problem === 2) runProblem8();
