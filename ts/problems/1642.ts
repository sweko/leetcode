import { readTestCase } from "../file-utils";
import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number, number], number> = {
    name: 'Furthest Building You Can Reach',
    id: 1642,
    url: 'https://leetcode.com/problems/furthest-building-you-can-reach/',
    solution: paramWrapper(furthestBuilding),
    tests: [
        {
            id: 1,
            argument: [[4,2,7,6,9,14,12], 5, 1],
            result: 4
        },
        {
            id: 2,
            argument: [[4,12,2,7,3,18,20,3,19], 10, 2],
            result: 7
        },
        {
            id: 3,
            argument: [[14,3,19,3], 17, 0],
            result: 3
        },
        {
            id: 4,
            argument: [[1,13,1,1,13,5,11,11], 10, 8],
            result: 7
        },
        {
            id: 5,
            argument: readTestCase(1642, 5, testCaseProcessor),
            result: 72329,
        }
    ]
}

function testCaseProcessor(input: string):[number[], number, number] {
    const [hinput, binput, linput] = input.split("\n");
    const heights = hinput.slice(1, hinput.length-1).split(",").map(h => parseInt(h));
    return [heights, parseInt(binput), parseInt(linput)];
}

const insertSorted = (sorted: number[], value: number):number => {
    let index = 0;
    while (index < sorted.length && sorted[index] < value) {
        index++;
    }
    sorted.splice(index, 0, value);
    return sorted.shift()!;
}

function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    const diffs: {diff:number, index: number}[] = [];
    for (let index = 1; index < heights.length; index++) {
        const diff = heights[index] - heights[index - 1];
        if (diff > 0) {
            diffs.push({diff, index});
        }
    }

    //let totalSort = 0;
    const jumps = new Array(ladders).fill(0);
    let bricksLeft = bricks;
    for (const diff of diffs) {
        //const start = performance.now();
        const jump = insertSorted(jumps, diff.diff);
        // const end = performance.now();
        // totalSort += end - start;
        bricksLeft -= jump;

        if (bricksLeft < 0) {
            //console.log(totalSort);
            return diff.index-1;
        }
    }

    //console.log(totalSort);
    return heights.length-1;
};

function furthestBuildingRecursive(heights: number[], bricks: number, ladders: number): number {
    const diffs: number[] = [];
    for (let index = 1; index < heights.length; index++) {
        const diff = heights[index] - heights[index - 1];
        if (diff > 0) {
            diffs.push(diff);
        }
    }
    const rest = Math.max(diffs.length - ladders, 0);
    const brickDiffs = diffs.slice().sort((a, b) => a - b).slice(0, rest).filter(diff => diff > 0);
    const totalBricksNeeded = brickDiffs.reduce((acc, cur) => acc + cur, 0);
    console.log(`Missing ${totalBricksNeeded - bricks}`);
    if (totalBricksNeeded <= bricks) {
        return heights.length-1;
    }

     return furthestBuildingRecursive(heights.slice(0, heights.length-1), bricks, ladders);
};