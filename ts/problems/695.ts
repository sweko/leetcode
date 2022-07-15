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

type Coords = {
    x: number;
    y: number;
}

function maxAreaOfIsland(grid: (1 | 0)[][]): number {
    const cache: Record<number, Record<number, boolean>> = {}
    let maxLand = 0;
    for (let rindex = 0; rindex < grid.length; rindex++) {
        const row = grid[rindex];
        for (let cindex = 0; cindex < row.length; cindex++) {
            const cell = row[cindex];
            if (cell === 0) {
                continue;
            }
            if (cache[rindex] && cache[rindex][cindex]) {
                continue;
            }

            const queue: Coords[] = [{ x: rindex, y: cindex }];
            const queueRecord: Record<string, Coords | undefined> = {};
            const island: Record<string, Coords> = {};
            while (true) {
                const coords = queue.shift();
                if (coords === undefined) {
                    break;
                }
                const key = `${coords.x}:${coords.y}`;
                queueRecord[key] = undefined;
                if (grid[coords.x][coords.y] === 0) {
                    continue;
                }
                if (island[key]) {
                    continue;
                }
                island[key] = coords;
                if (coords.x < grid.length - 1) {
                    const qkey = `${coords.x + 1}:${coords.y}`;
                    const qcoord = { x: coords.x + 1, y: coords.y };
                    if (!queueRecord[qkey]) {
                        queueRecord[qkey] = qcoord;
                        queue.push(qcoord);
                    }
                }
                if (coords.x > 0) {
                    const qkey = `${coords.x - 1}:${coords.y}`;
                    const qcoord = { x: coords.x - 1, y: coords.y };
                    if (!queueRecord[qkey]) {
                        queueRecord[qkey] = qcoord;
                        queue.push(qcoord);
                    }
                }
                if (coords.y < grid[0].length - 1) {
                    const qkey = `${coords.x}:${coords.y + 1}`;
                    const qcoord = { x: coords.x, y: coords.y + 1 };
                    if (!queueRecord[qkey]) {
                        queueRecord[qkey] = qcoord;
                        queue.push(qcoord);
                    }
                }
                if (coords.y > 0) {
                    const qkey = `${coords.x}:${coords.y - 1}`;
                    const qcoord = { x: coords.x, y: coords.y - 1 };
                    if (!queueRecord[qkey]) {
                        queueRecord[qkey] = qcoord;
                        queue.push(qcoord);
                    }
                }
            }
            let count = 0;

            for (const landKey of Object.keys(island)) {
                const land = island[landKey];
                if (!cache[land.x]) {
                    cache[land.x] = {};
                }
                cache[land.x][land.y] = true;
                count += 1;
            }
            if (maxLand < count) {
                maxLand = count;
            }
        }
    }
    return maxLand;
};