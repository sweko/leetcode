import { Problem } from "../model";

export const problem: Problem<number, number> = {
    name: 'Concatenation of Consecutive Binary Numbers',
    id: 1680,
    url: 'https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/',
    solution: concatenatedBinary,
    tests: [
        {
            id: 1,
            argument: 1,
            result: 1
        },
        {
            id: 2,
            argument: 3,
            result: 27
        },
        {
            id: 3,
            argument: 12,
            result: 505379714
        }
    ]
}

function concatenatedBinary(n: number): number {
    const modulo = 1_000_000_007;
    let result = 0;
    let power = 1;
    for (let i = 1; i <= n; i++) {
        if (i === power) {
            power *=2;
        }

        result = (result * power + i) % modulo;
    }
    return result;
};

