import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<number[], number> = {
    name: 'Reduce Array Size to The Half',
    id: 1338,
    url: 'https://leetcode.com/problems/reduce-array-size-to-the-half/',
    solution: minSetSize,
    tests: [
        {
            id: 1,
            argument: [3,3,3,3,5,5,5,2,2,7],
            result: 2
        },
        {
            id: 2,
            argument: [7,7,7,7,7,7],
            result: 1
        }
    ]
}

function minSetSize(arr: number[]): number {
    const hist: Record<number, number> = {};
    for (const element of arr) {
        if (hist[element]) {
            hist[element] += 1;
        } else {
            hist[element] = 1;
        }
    }
    const counts = Object.keys(hist).map(key => ({element: Number(key), count: hist[Number(key)]}));
    counts.sort((a, b) => b.count - a.count);

    const half = Math.ceil(arr.length / 2);
    let total = 0;
    let index = 0;
    while (total < half) {
        total += counts[index].count;
        index += 1;
    }

    return index;
};