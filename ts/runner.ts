import { Problem } from './model';


const [id] = process.argv.slice(2)

try {
    const problem = require(`./problems/${id}.ts`).problem as Problem;

    for (const test of problem.tests) {
        const actual = problem.solution(test.argument);
        const expected = test.result;
        if (actual !== expected) {
            console.log(`${id}: failed test case ${test.id}, Expected: ${expected}, Actual: ${actual}`);
        }
    }
    console.log("finished");

} catch (e) {
    console.error(e);
    console.error(`Problem ${id} not found`);
}
