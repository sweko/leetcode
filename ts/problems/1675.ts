import { Problem } from "../model";

export const problem: Problem<number[], number> = {
    name: 'Minimize Deviation in Array',
    id: 1675,
    url: 'https://leetcode.com/problems/minimize-deviation-in-array/',
    solution: minimumDeviation,
    tests: [
        // {
        //     id: 1,
        //     argument: [1, 2, 3, 4],
        //     result: 1
        // },
        // {
        //     id: 2,
        //     argument: [4, 1, 5, 20, 3],
        //     result: 3
        // },
        // {
        //     id: 3,
        //     argument: [2, 10, 8],
        //     result: 3
        // },
        // {
        //     id: 4,
        //     argument: [9,4,3,6,2],
        //     result: 7
        // },
        {
            id: 5,
            argument: [399,908,648,357,693,502,331,649,596,698],
            result: 315
        }
    ]
}

function minimumDeviation(nums: number[]): number {
    const nnums = nums.map(n => {
        if (n % 2 === 0) {
            const result = [n];
            while (n % 2 === 0) {
                n /= 2;
                result.push(n);
            }
            return result;
        }
        return [n, n * 2];
    });
    const first = nnums[0];
    let result = Number.MAX_SAFE_INTEGER;
    for (const candidate of first) {
        console.log(`candidate: ${candidate}`);
        let diff = 0;
        let min = candidate;
        let max = candidate;
        for (let index = 1; index < nnums.length; index++) {
            const idiffs = nnums[index]
                .map(n => ({
                    value: n,
                    diff: Math.max(Math.abs(n - min), Math.abs(n - max))
                }))

            console.log(`  For index ${index} idiffs: ${JSON.stringify(idiffs)}`);

            let mindiff = {
                value: -1,
                diff: Number.MAX_SAFE_INTEGER
            };
            for (const idiff of idiffs) {
                if (idiff.diff < mindiff.diff) {
                    mindiff = idiff;
                }
            }
            console.log(`    mindiff: ${JSON.stringify(mindiff)}`);
            min = Math.min(min, mindiff.value);
            max = Math.max(max, mindiff.value);
            diff = Math.max(diff, mindiff.diff);
            console.log(`    min: ${min}, max: ${max}, diff: ${diff}`)
        }
        result = Math.min(result, diff);
    }
    return result;
};
