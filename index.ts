import runProblem1 from './days/01/problem1';
import { runProblem2 } from './days/01/problem2';
import runProblem3 from './days/02/problem3';
import runProblem4 from './days/02/problem4';
import runProblem5 from './days/03/problem5';
import runProblem6 from './days/03/problem6';
import { runProblem7 } from './days/04/problem7';
import runProblem8 from './days/04/problem8';
import runProblem10 from './days/05/problem10';
import runProblem9 from './days/05/problem9';
import runProblem11 from './days/06/problem11';
import runProblem13 from './days/07/problem13';
import runProblem14 from './days/07/problem14';
import runProblem15 from './days/08/problem15';
import runProblem17 from './days/09/problem17';
import runProblem19 from './days/10/problem19';
import runProblem20 from './days/10/problem20';
import runProblem21 from './days/11/problem21';
import runProblem22 from './days/11/problem22';
import runProblem23 from './days/12/problem23';

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
else if (day === 5 && problem === 1) runProblem9();
else if (day === 5 && problem === 2) runProblem10();
else if (day === 6 && problem === 1) runProblem11();
else if (day === 7 && problem === 1) runProblem13();
else if (day === 7 && problem === 2) runProblem14();
else if (day === 8 && problem === 1) runProblem15();
else if (day === 9 && problem === 1) runProblem17();
else if (day === 10 && problem === 1) runProblem19();
else if (day === 10 && problem === 2) runProblem20();
else if (day === 11 && problem === 1) runProblem21();
else if (day === 11 && problem === 2) runProblem22();
else if (day === 12 && problem === 1) runProblem23();
