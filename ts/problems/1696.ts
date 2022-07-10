import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number], number> = {
    name: 'Jump Game VI',
    id: 1696,
    url: 'https://leetcode.com/problems/jump-game-vi/',
    solution: paramWrapper(maxResult),
    tests: [
        {
            id: 1,
            argument: [[1,-1,-2,4,-7,3], 2],
            result: 7
        },
        {
            id: 2,
            argument: [[10,-5,-2,4,0,3], 3],
            result: 17
        },
        {
            id: 3,
            argument: [[1,-5,-20,4,-1,3,-6,-3], 2],
            result: 0
        },
        {
            id: 4,
            argument: [[0,-1,-2,-3,1], 2],
            result: -1
        }
    ]
}

function maxResult(nums: number[], k: number): number {
    // moni's algorithm
    const steps = nums.slice(1, -1);
    let score = nums[0] + nums[nums.length-1];
    let index = 0; 
    while (index < steps.length) {
        if (steps[index] >= 0) {
            // console.log(`Stepping on ${steps[index]}`);
            score += steps[index];
            index += 1;
            continue;
        }
        const targets = steps.slice(index, index + k);
        if (targets.length < k) {
            targets.push(0);
        }
        let tindex = 0;
        while (tindex < targets.length && targets[tindex] < 0) {
            tindex += 1;
        }
        if (tindex !== targets.length) {
            // console.log(`Stepping on ${steps[index + tindex]}`);
            score += steps[index + tindex] || 0;
            index += tindex + 1;
            continue;
        }
        let mindex = 0;
        tindex = 0;
        while (tindex < targets.length) {
            if (targets[tindex] >= targets[mindex]) {
                mindex = tindex;
            }
            tindex += 1;
        }
        // console.log(`Stepping on ${steps[index + mindex]}`);
        score += steps[index + mindex];
        index += mindex + 1;
    }
    return score;
};