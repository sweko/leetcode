import { Problem } from "../model";

export const problem: Problem<number[], number[]> = {
    name: 'Squares of a Sorted Array',
    id: 976,
    url: 'https://leetcode.com/problems/squares-of-a-sorted-array/',
    solution: sortedSquares,
    tests: [
        {
            id: 1,
            argument: [-4,-1,0,3,10],
            result: [0,1,9,16,100]
        },
        {
            id: 2,
            argument:  [-7,-3,2,3,11],
            result: [4,9,9,49,121]
        }
    ]
}

function sortedSquares(nums: number[]): number[] {
    // trivial solution
    return nums.map(n => n*n).sort((a, b) => a - b);
};
