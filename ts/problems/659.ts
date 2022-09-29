import { Problem } from "../model";

export const problem: Problem<number[], boolean> = {
    name: 'Split Array into Consecutive Subsequences',
    id: 659,
    url: 'https://leetcode.com/problems/split-array-into-consecutive-subsequences/',
    solution: isPossible,
    tests: [
        {
            id: 1,
            argument: [1,2,3,3,4,5],
            result: true
        },
        {
            id: 2,
            argument:  [1,2,3,3,4,4,5,5],
            result: true
        }
    ]
}

function isPossible(nums: number[]): boolean {
    const splits: number[][] = [];
    for (const number of nums) {
        let found = false;
        // const applicables = splits
        //     .filter(split => split[split.length-1] === number -1)
        //     .sort((a, b) => a.length - b.length);

        // if (applicables.length === 0) {
            
        // }

        for (const split of splits) {
            if (split[split.length-1] === number-1) {
                found = true;
                split.push(number);
                break;
            }
        }
        if (!found) {
            splits.unshift([number]);
        }
    }
    console.log(splits);
    return splits.every(split => split.length >= 3);
};
