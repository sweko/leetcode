import { Problem } from "../model";
import { TreeNode } from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<(1 | 0)[][], number> = {
    name: 'Max Area of Island',
    id: 695,
    url: 'https://leetcode.com/problems/max-area-of-island/',
    solution: maxAreaOfIsland,
    tests: [
        {
            id: 1,
            argument: [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]],
            result: 6
        },
        {
            id: 2,
            argument: [[0, 0, 0, 0, 0, 0, 0, 0]],
            result: 0
        },
        {
            id: 3,
            argument: [[1]],
            result: 1,
        }
    ]
}

function maxAreaOfIsland(grid: (1 | 0)[][]): number {
    const resultGrid = Array(grid.length).fill(0).map(_ => Array(grid[0].length).fill(0));
    let maxLand = 0;
    for (let rindex = 0; rindex < grid.length; rindex++) {
        const row = grid[rindex];
        for (let cindex = 0; cindex < row.length; cindex++) {
            const cell = row[cindex];
            if (cell === 0) {
                continue;
            }
            if (resultGrid[rindex][cindex] !== 0) {
                continue;
            }

            const queue = [{ x: rindex, y: cindex }];
            const island: { x: typeof rindex, y: typeof cindex }[] = [];
            while (true) {
                const coords = queue.shift();
                if (coords === undefined) {
                    break;
                }
                if (grid[coords.x][coords.y] === 0) {
                    continue;
                }
                if (island.some(c => c.x === coords.x && c.y === coords.y)) {
                    continue;
                }
                island.push(coords);
                if (coords.x < grid.length - 1) {
                    queue.push({ x: coords.x + 1, y: coords.y });
                }
                if (coords.x > 0) {
                    queue.push({ x: coords.x - 1, y: coords.y });
                }
                if (coords.y < grid[0].length - 1) {
                    queue.push({ x: coords.x, y: coords.y + 1 });
                }
                if (coords.y > 0) {
                    queue.push({ x: coords.x, y: coords.y - 1 });
                }
            }
            for (const land of island) {
                resultGrid[land.x][land.y] = island.length;
            }
            if (maxLand < island.length) {
                maxLand = island.length;
            }
        }
    }
    return maxLand;
};