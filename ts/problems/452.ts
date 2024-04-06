import { readOutputJson, readTestCase } from "../file-utils";
import { Problem } from "../model";

export const problem: Problem<[number, number][], number> = {
    name: 'Minimum Number of Arrows to Burst Balloons',
    id: 452,
    url: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
    solution: findMinArrowShots,
    tests: [
        {
            id: 1,
            argument: [[10, 16], [2, 8], [1, 6], [7, 12]],
            result: 2
        },
        {
            id: 2,
            argument: [[1, 2], [3, 4], [5, 6], [7, 8]],
            result: 4
        },
        {
            id: 3,
            argument: [[1, 2], [2, 3], [3, 4], [4, 5]],
            result: 2
        }
    ]
}

function findMinArrowShots(points: [number, number][]): number {
    points.sort((a, b) => a[0] - b[0]);
    let arrows = 0;
    let i = 0;
    while (i < points.length) {
        let [_, end] = points[i];
        while (i < points.length && points[i][0] <= end) {
            end = Math.min(end, points[i][1]);
            i++;
        }
        arrows++;
    }
    return arrows;
};