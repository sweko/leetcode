import { Problem } from "../model";

export const problem: Problem<number[], number> = {
    name: 'Largest Perimeter Triangle',
    id: 976,
    url: 'https://leetcode.com/problems/largest-perimeter-triangle/',
    solution: largestPerimeter,
    tests: [
        {
            id: 1,
            argument: [2,1,2],
            result: 5
        },
        {
            id: 2,
            argument:  [1,2,1],
            result: 0
        }
    ]
}

function largestPerimeter(nums: number[]): number {
    nums.sort((a, b) => a - b);
    for (let index = nums.length - 1; index >= 2; index--) {
        if (nums[index] < nums[index-1] + nums[index-2]) {
            return nums[index] + nums[index-1] + nums[index-2];
        }
    }
    return 0;
};