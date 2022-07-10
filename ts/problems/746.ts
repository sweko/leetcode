import { Problem } from "../model";

export const problem: Problem<number[], number> = {
    name: 'Min Cost Climbing Stairs',
    id: 746,
    url: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
    solution: minCostClimbingStairs,
    tests: [
        {
            id: 1,
            argument: [10, 15, 20],
            result: 15
        },
        {
            id: 2,
            argument: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1],
            result: 6
        }
    ]
}

function minCostClimbingStairs(cost: number[]): number {
    cost.unshift(0);
    const memo: Record<number, number> = {
        [cost.length]: 0,
        [cost.length+1]:0,
    };
    function inner(index: number):number {
        if (memo[index] === undefined) {
            memo[index] = cost[index] + Math.min(inner(index+1), inner(index+2));
        }
        return memo[index];
    }

    return inner(0);
};