import { Problem } from "../model";
import { voidWrapper } from "../utils";

export const problem: Problem<number[][], number[][]> = {
    name: 'Rotate Image',
    id: 48,
    url: 'https://leetcode.com/problems/rotate-image/',
    solution: voidWrapper(rotate),
    tests: [
        {
            id: 1,
            argument: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
            result: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
        },
        {
            id: 2,
            argument: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]],
            result: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]
        }
    ]
}

function rotate(matrix: number[][]): void {
    const height = matrix.length;
    const max = height - 1;
    const top = Math.floor(height / 2);
    const left = Math.ceil(height / 2);
    for (let row = 0; row < top; row++) {
        for (let col = 0; col < left; col++) {
            const temp = matrix[row][col];
            // [top, left] goes to [left, max-top] 
            matrix[row][col] = matrix[max-col][row];
            matrix[max-col][row]= matrix[max-row][max-col];
            matrix[max-row][max-col] = matrix[col][max-row];
            matrix[col][max-row] = temp;
        }
    }
};