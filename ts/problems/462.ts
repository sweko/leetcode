import { Problem } from "../model";

export const problem: Problem<number[], number> = {
    name: 'Minimum Moves to Equal Array Elements II',
    id: 462,
    url: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/',
    solution: minMoves2,
    tests: [
        {
            id: 1,
            argument: [1, 2, 3],
            result: 2
        },
        {
            id: 2,
            argument: [1, 10, 2, 9],
            result: 16
        },
        {
            id: 3,
            argument: [1, 0, 0, 8, 6],
            result: 14
        },
        {
            id: 4,
            argument: [203125577, -349566234, 230332704, 48321315, 66379082, 386516853, 50986744, -250908656, -425653504, -212123143],
            result: 2127271182
        }
    ]
}

function minMoves2(nums: number[]): number {
    // sort the array and find the median
    const data = nums.slice().sort((a, b) => a - b);
    const len = nums.length;
    const average = (len % 2 === 1) 
        ? data[Math.floor(len/2)]
        : Math.floor((data[len/2 - 1] + data[len/2])/2);

    let result = 0;
    for (const num of nums) {
        result += Math.abs(num - average);
    }
    return result;
};