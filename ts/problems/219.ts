import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number], boolean> = {
    name: 'Contains Duplicate II',
    id: 219,
    url: 'https://leetcode.com/problems/contains-duplicate-ii/',
    solution: paramWrapper(containsNearbyDuplicate),
    tests: [
        {
            id: 1,
            argument:  [[1,2,3,1], 3],
            result: true
        },
        {
            id: 2,
            argument: [[1,0,1,1], 1],
            result: true
        },
        {
            id: 3,
            argument: [[1,2,3,1,2,3], 2],
            result: false
        }
    ]
}

function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map = new Map<number, number>();
    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        if (map.has(num) && index - map.get(num)! <= k) {
            return true;
        }
        map.set(num, index);
    }
    return false;
};