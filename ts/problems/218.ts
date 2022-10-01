import { Problem } from "../model";

export const problem: Problem<[number, number, number][], [number, number][]> = {
    name: 'The Skyline Problem',
    id: 218,
    url: 'https://leetcode.com/problems/the-skyline-problem/',
    solution: getSkyline,
    tests: [
        {
            id: 1,
            argument:  [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]],
            result: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
        },
        {
            id: 2,
            argument: [[0,2,3],[2,5,3]],
            result: [[0,3],[5,0]]
        }
    ]
}

function getSkyline(buildings: [number, number, number][]): [number, number][] {
    const splits = new Set<number>();
    for (const [start, end, _] of buildings) {
        splits.add(start);
        splits.add(end);
    }
    const sortedSplits = Array.from(splits).sort((a, b) => a - b);
    const result: [number, number][] = [];
    let currentHeight = 0;
    for (let index = 0; index < sortedSplits.length - 1; index++) {
        const position = sortedSplits[index];
        const heights = buildings
            .filter(([start, end, _]) => start <= position && end > position)
            .map(([_, __, height]) => height);
        const max = heights.length ? Math.max(...heights) : 0;
        if (max !== currentHeight) {
            result.push([position, max]);
            currentHeight = max;
        }
    }
    result.push([sortedSplits[sortedSplits.length - 1], 0]);
    return result;
};