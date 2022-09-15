import { Problem } from "../model";

export const problem: Problem<number[], number[]> = {
    name: 'Find Original Array From Doubled Array',
    id: 2007,
    url: 'https://leetcode.com/problems/find-original-array-from-doubled-array/',
    solution: findOriginalArray,
    tests: [
        {
            id: 1,
            argument: [1,3,4,2,6,8],
            result: [1,3,4]
        },
        {
            id: 2,
            argument: [6,3,0,1],
            result: []
        },
        {
            id: 3,
            argument: [1],
            result: []
        },
        {
            id: 4,
            argument: [2,1,2,4,2,4],
            result: [1,2,2]
        },
        {
            id: 5,
            argument: [0,0,0,0],
            result: [0, 0]
        }
    ]
}

function findOriginalArray(changed: number[]): number[] {
    const passed = Array(changed.length).fill(false);
    const result = [];
    changed.sort((a, b) => a-b);
    let index = 0;
    let dindex = 0;
    while (index < changed.length) {
        while (passed[index]) {
            index += 1;
        }
        if (index >= changed.length) {
            return result;
        }
        const first = changed[index];
        dindex = changed.indexOf(first * 2, Math.max(index, dindex)+1);
        if (dindex === -1) {
            return [];
        }
        passed[dindex]  = true;
        result.push(first);
        index += 1;
    }
    return result;
};