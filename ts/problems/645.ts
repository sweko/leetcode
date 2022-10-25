import { Problem } from "../model";

export const problem: Problem<number[], number[]> = {
    name: 'Set Mismatch',
    id: 645,
    url: 'https://leetcode.com/problems/set-mismatch/',
    solution: findErrorNums,
    tests: [
        {
            id: 1,
            argument: [1,2,2,4],
            result: [2,3]
        },
        {
            id: 2,
            argument:  [1,1],
            result: [1,2]
        }
    ]
}

function findErrorNums(nums: number[]): number[] {
    const limit = nums.length;
    const counts = new Array(limit+1).fill(0);
    for (const num of nums) {
        counts[num]++;
    };

    const result = [0, 0];
    for (let index = 1; index <= limit; index++) {
        if (counts[index] === 0) {
            result[1] = index;
        }
        if (counts[index] === 2) {
            result[0] = index;
        }
    }
    return result;
};
