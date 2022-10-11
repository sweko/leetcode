import { Problem } from "../model";

export const problem: Problem<number[], boolean> = {
    name: 'Increasing Triplet Subsequence',
    id: 334,
    url: 'https://leetcode.com/problems/increasing-triplet-subsequence/',
    solution: increasingTriplet,
    tests: [
        {
            id: 1,
            argument: [1,2,3,4,5],
            result: true
        },
        {
            id: 2,
            argument: [5,4,3,2,1],
            result: false
        },
        {
            id: 3,
            argument: [2,1,5,0,4,6],
            result: true
        }
    ]
}

function increasingTriplet(nums: number[]): boolean {
    let min = Number.POSITIVE_INFINITY;
    let secondMin = Number.POSITIVE_INFINITY;
    for (const num of nums) {
        if (num <= min) {
            min = num;
        } else if (num <= secondMin) {
            secondMin = num;
        } else {
            return true;
        }
    }
    return false;
};