import { Problem } from './model';
import { compare } from './utils';

async function main() {
    const [id] = process.argv.slice(2)
    const chalk = new (await import('chalk')).Chalk();
    try {
        const problem = require(`./problems/${id}.ts`).problem as Problem;

        for (const test of problem.tests) {
            const actual = problem.solution(test.argument);
            const expected = test.result;
            if (!compare(actual, expected)) {
                console.log(chalk.red(`${id}: failed test case ${test.id}, Expected: ${expected}, Actual: ${actual}`));
            } else {
                console.log(chalk.green(`${id}: passed test case ${test.id}`));
            }
        }
        console.log("finished");

    } catch (e) {
        // console.error(e);
        console.error(chalk.redBright(`Problem ${id} not found`));
    }
};

main();