import { Problem } from "../model";
import { TreeNode, wrapTree} from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<[number, number, number], number> = {
    name: 'Number of Dice Rolls With Target Sum',
    id: 1155,
    url: 'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/',
    solution: paramWrapper(numRollsToTarget),
    tests: [
        {
            id: 1,
            argument: [1, 6, 3],
            result: 1
        },
        {
            id: 2,
            argument: [2, 6, 7],
            result: 6
        },
        {
            id: 3,
            argument: [30, 30, 500],
            result: 222616187
        },
    ]
}

const modulo = 1_000_000_007;

const memo: Record<string, number> = {};

function numRollsToTarget(n: number, k: number, target: number): number {
    const key = `${n}:${k}:${target}`;
    if (memo[key] !== undefined) {
        return memo[key];
    }
    if (n <= 0) {
        return target === 0 ? 1 : 0;
    }
    let result = 0;
    for (let i = 1; i <= k; i++) {
        result += numRollsToTarget(n - 1, k, target - i);
        result %= modulo;
    }
    memo[key] = result;
    return result;
};