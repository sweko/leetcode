import { Problem } from "../model";

export const problem: Problem<number[], number> = {
    name: 'Binary Trees With Factors',
    id: 823,
    url: 'https://leetcode.com/problems/binary-trees-with-factors/',
    solution: numFactoredBinaryTrees,
    tests: [
        {
            id: 1,
            argument: [2,4],
            result: 3
        },
        {
            id: 2,
            argument: [2,4,5,10],
            result: 7
        },
        {
            id: 3,
            argument: [46,144,5040,4488,544,380,4410,34,11,5,3063808,5550,34496,12,540,28,18,13,2,1056,32710656,31,91872,23,26,240,18720,33,49,4,38,37,1457,3,799,557568,32,1400,47,10,20774,1296,9,21,92928,8704,29,2162,22,1883700,49588,1078,36,44,352,546,19,523370496,476,24,6000,42,30,8,16262400,61600,41,24150,1968,7056,7,35,16,87,20,2730,11616,10912,690,150,25,6,14,1689120,43,3128,27,197472,45,15,585,21645,39,40,2205,17,48,136],
            result: 509730797
        }
    ]
}

function numFactoredBinaryTrees(arr: number[]): number {
    const result: Record<number, number> = {};
    const mod = 10**9 + 7;
    arr.sort((a,b) => a-b);

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const factors = [];
        for (let findex = 0; findex < index; findex++) {
            if (element % arr[findex] === 0) {
                factors.push(arr[findex]);
            }
        }
        let value = 1; // base case, just the item
        for (const factor of factors) {
            const other = element / factor; //possible precision issu
            if (factors.includes(other)) {
                value += result[factor] * result[other];
            }
            value = value % mod;
        }
        result[element] = value;
    }

    const output = Object.keys(result).reduce((acc, key) => acc + result[Number(key)], 0)
    return output % mod;
};