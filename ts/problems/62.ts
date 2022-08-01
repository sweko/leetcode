import { Problem } from "../model";
import { arrayToTree, TreeNode} from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<[number, number], number> = {
    name: 'Unique Paths',
    id: 62,
    url: 'https://leetcode.com/problems/unique-paths/',
    solution: paramWrapper(uniquePaths),
    tests: [
        {
            id: 1,
            argument: [ 3, 7],
            result: 28
        },
        {
            id: 2,
            argument: [3, 2],
            result: 3
        },
        {
            id: 3,
            argument: [51, 9],
            result: 1916797311
        }
    ]
}

const memo: Record<number, Record<number, number>> = {
    1: {
        1: 1
    }
};

function uniquePaths(m: number, n: number): number {
    if (memo[m] && memo[m][n]) {
        return memo[m][n];
    }
    if ((m<=0) || (n<=0)) {
        if (!memo[m]) {
            memo[m] = {};
        }
        memo[m][n] = 0;
        return 0;
    }
    const result = uniquePaths(m-1, n) + uniquePaths(m, n-1);
    if (!memo[m]) {
        memo[m] = {};
    }
    memo[m][n] = result;
    return result;
};