// https://leetcode.com/problems/triangle/

import { Problem } from "../model";

export const problem: Problem<number[][], number> = {
    name: 'Triangle',
    id: 120,
    url: 'https://leetcode.com/problems/triangle/',
    solution: minimumTotal,
    tests: [
        {
            id: 1,
            argument: [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]],
            result: 11
        }
    ]
}

function minimumTotal(triangle: number[][]): number {
    for (let i = triangle.length - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
        }
    }
    return triangle[0][0];
};
