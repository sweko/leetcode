import { Problem } from "../model";
import { expandMatrix } from "../problem-utils";

export const problem: Problem<number[][], number[][]> = {
    name: 'Pacific Atlantic Water Flow',
    id: 417,
    url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    solution: pacificAtlantic,
    tests: [
        {
            id: 1,
            argument: [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]],
            result: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
        },
        {
            id: 2,
            argument:  [[1]],
            result: [[0,0]]
        }
    ]
}

interface CellFlow {
    pacific : boolean | null;
    atlantic: boolean | null;
}

interface CellFlowIndex {
    pacific : boolean | null;
    atlantic: boolean | null;
    x: number;
    y: number;
}


function pacificAtlantic(heights: number[][]): number[][] {
    if (heights.length === 0) {
        return [];
    }
    const flows: CellFlow[][] = heights.map(row => row.map(_ => ({pacific: null, atlantic: null})));
    const height = heights.length;
    const width = heights[0].length;

    const queue = [];

    for (let index = 0; index < height; index++) {
        flows[index][0].pacific = true;
        flows[index][width-1].atlantic = true;
    }

    for (let index = 0; index < width; index++) {
        flows[0][index].pacific = true;
        flows[height-1][index].atlantic = true;
    }

    return [];
};