import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<number[][], number[][]> = {
    name: 'Sort the Matrix Diagonally',
    id: 1329,
    url: 'https://leetcode.com/problems/sort-the-matrix-diagonally/',
    solution: diagonalSort,
    tests: [
        {
            id: 1,
            argument: [[3,3,1,1],[2,2,1,2],[1,1,1,2]],
            result: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
        },
        {
            id: 2,
            argument: [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]],
            result: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]
        }
    ]
}

function diagonalSort(mat: number[][]): number[][] {
    const height = mat.length;
    const width = mat[0].length;
    const heap: Record<number, number[]> = {};

    for (let rindex = 0; rindex < height; rindex++) {
        for (let cindex = 0; cindex < width; cindex++) {
            const cell = mat[rindex][cindex];
            const diff = rindex - cindex;
            if (!heap[diff]) {
                heap[diff] = [];
            }
            heap[diff].push(cell);
        }
    }

    for (const key in heap) {
        if (Object.prototype.hasOwnProperty.call(heap, key)) {
            const values = heap[key];
            values.sort((a, b) => a-b);
        }
    }

    const result = Array(height).fill(0).map(_ => Array(width).fill(0));

    for (let rindex = 0; rindex < height; rindex++) {
        for (let cindex = 0; cindex < width; cindex++) {
            const diff = rindex - cindex;
            result[rindex][cindex] = heap[diff].shift();
        }
    }

    return result;

};