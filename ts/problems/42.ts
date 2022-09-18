import { Problem } from "../model";

export const problem: Problem<number[], number> = {
    name: 'Trapping Rain Water',
    id: 42,
    url: 'https://leetcode.com/problems/trapping-rain-water/',
    solution: trap,
    tests: [
        {
            id: 1,
            argument: [0,1,0,2,1,0,1,3,2,1,2,1],
            result: 6
        },
        {
            id: 2,
            argument: [4,2,0,3,2,5],
            result: 9
        }
    ]
}

function trap(heights: number[]): number {
    let count = 0;
    for (let index = 1; index < heights.length -1; index++) {
        const current = heights[index];
        let lindex = index-1;
        let lmax = heights[lindex];
        while (lindex >= 0) {
            if (lmax < heights[lindex] ) {
                lmax = heights[lindex];
            }
            lindex -= 1;
        }
        if (lmax <= current) {
            continue;
        }
        let rindex = index+1;
        let rmax = heights[rindex];
        while (rindex < heights.length) {
            if (rmax < heights[rindex] ) {
                rmax = heights[rindex];
            }
            rindex += 1;
        }
        if (rmax <= current) {
            continue;
        }
        const value = Math.min(lmax, rmax) - current;
        //console.log(`Water depth at index ${index} is ${value}`);
        count += value;
    }
    return count;
};

// const current = heights[index];
// if (current > lmax) {
//     lmax = current;
//     continue;
// }
// let rindex = index+1;
// let rmax = heights[rindex];
// while (rindex < heights.length && rmax < lmax) {
//     rindex +=1;
//     rmax = heights[rindex];
// }
// if (rindex === heights.length) {

// }

