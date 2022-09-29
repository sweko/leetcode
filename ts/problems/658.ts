import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number, number], number[]> = {
    name: 'Find K Closest Elements',
    id: 658,
    url: 'https://leetcode.com/problems/find-k-closest-elements/',
    solution: paramWrapper(findClosestElements),
    tests: [
        {
            id: 1,
            argument: [[1,2,3,4,5], 4, 3],
            result: [1,2,3,4]
        },
        {
            id: 2,
            argument:  [[1,2,3,4,5], 4, -1],
            result: [1,2,3,4]
        }
    ]
}

function findClosestElements(arr: number[], k: number, x: number): number[] {
    // C# equivalent port - inefficient code 
    const diffs = arr.map(num => ({ value: num, diff: Math.abs(num - x) }))
    diffs.sort((a, b) => (a.diff - b.diff) || (a.value - b.value));
    const values = diffs.map(diff => diff.value).slice(0, k);
    values.sort((a, b) => a - b);
    return values;
};