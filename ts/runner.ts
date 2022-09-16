import { performance } from 'perf_hooks';
import { Problem } from './model';
import { compare } from './utils';

async function main() {
    const [id] = process.argv.slice(2)
    const chalk = new (await import('chalk')).Chalk();
    try {
        const problem = require(`./problems/${id}.ts`).problem as Problem;

        for (const test of problem.tests) {
            const start = performance.now();
            const actual = problem.solution(test.argument);
            const end = performance.now();
            const duration = (end - start) | 0;
            const expected = test.result;
            if (duration > 1) {
                console.log(chalk.yellow(`${id}: Test case ${test.id} duration: ${duration}`));
            }
            if (compare(actual, expected)) {
                console.log(chalk.green(`${id}: passed test case ${test.id}`));
            } else {
                console.log(chalk.red(`${id}: failed test case ${test.id}, Expected: ${expected}, Actual: ${actual}`));
            }
        }
        console.log("finished");

    } catch (e) {
        console.error(e);
        console.error(chalk.redBright(`Problem ${id} not found`));
    }
};

main();