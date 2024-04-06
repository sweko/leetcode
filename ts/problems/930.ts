import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number], number> = {
    name: 'Binary Subarrays With Sum',
    id: 930,
    url: 'https://leetcode.com/problems/binary-subarrays-with-sum/',
    solution: paramWrapper(numSubarraysWithSum),
    tests: [
        {
            id: 1,
            argument: [[1,0,1,0,1], 2],
            result: 4
        },
        {
            id: 2,
            argument: [[0,0,0,0,0], 0],
            result: 15
        },
        {
            id: 3,
            argument: [[0,1,1,1,1], 3],
            result: 3
        }
    ]
}

function numSubarraysWithSum(nums: number[], goal: number): number {
    if (goal === 0) {
        let count = 0;
        let start = 0;
        while (start < nums.length) {
            let end = start;
            while (nums[end] === 0) {
                end += 1;
            }
            count += (end - start + 1) * (end - start) / 2;
            start = end + 1;
        }
        return count;
    }

    let count = 0;

    for (let findex = 0; findex < nums.length - goal + 1; findex++) {
        let sum = 0;
        let sindex = findex;

        while (sum < goal) {
            sum += nums[sindex];
            sindex += 1;

            if (sindex === nums.length) {
                break;
            }
        }

        if (sum === goal) {
            count += 1;
        }

        while (sum === goal) {
            sum += nums[sindex];
            sindex += 1;
            if (sum === goal) {
                count += 1;
            }
        }
    }
    return count;
};