import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number[][], number, number, number], number> = {
    name: 'Paint House III',
    id: 1473,
    url: 'https://leetcode.com/problems/paint-house-iii/',
    solution: paramWrapper(minCost),
    tests: [
        {
            id: 1,
            argument: [[0, 0, 0, 0, 0], [[1, 10], [10, 1], [10, 1], [1, 10], [5, 1]], 5, 2, 3],
            result: 9
        },
        {
            id: 2,
            argument: [[0, 2, 1, 2, 0], [[1, 10], [10, 1], [10, 1], [1, 10], [5, 1]], 5, 2, 3],
            result: 11
        },
        {
            id: 3,
            argument: [[3, 1, 2, 3], [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]], 4, 3, 3],
            result: -1
        }
    ]
}

function minCost(houses: number[], cost: number[][], m: number, n: number, target: number): number {
    const memo: Record<string, number> = {};

    function minCostInner(index: number, lastColor: number, left: number): number {
        const key = `${index}.${lastColor}.${left}`;
        if (memo[key] !== undefined) {
            return memo[key];
        }

        if (left < 0) {
            memo[key] = Number.POSITIVE_INFINITY;
            return Number.POSITIVE_INFINITY;
        }
        if (index === houses.length) {
            const result = (left === 0) ? 0 : Number.POSITIVE_INFINITY;
            memo[key] = result;
            return result;
        }

        // if the house is colored
        if (houses[index] !== 0) {
            // is it the same neighborhood as the previous one?
            const remaining = (houses[index] === lastColor) ? left : left - 1;
            const result = minCostInner(index + 1, houses[index], remaining);
            memo[key] = result;
            return result;
        }

        // the house is blank
        // try coloring it with every color, and see what happens :)
        let min = Number.POSITIVE_INFINITY;
        for (let cindex = 0; cindex < n; cindex++) {
            const remaining = (cindex+1 === lastColor) ? left : left - 1;
            const icost = cost[index][cindex] + minCostInner(index+1, cindex + 1, remaining);
            if (icost < min) {
                min = icost;
            }
        }
        memo[key] = min;
        return min;
    }

    // is the first house colored?
    if (houses[0]) {
        // min cost is the cost to color all the other houses
        const result = minCostInner(1, houses[0], target - 1);
        if (isFinite(result)) {
            return result;
        }
        return -1;
    }

    // try coloring it with every color, and see what happens :)
    let min = Number.POSITIVE_INFINITY;
    for (let index = 0; index < n; index++) {
        const icost = cost[0][index] + minCostInner(1, index + 1, target - 1);
        if (icost < min) {
            min = icost;
        }
    }
    if (isFinite(min)) {
        return min;
    }
    return -1;
}

function minCostOne(houses: number[], cost: number[][], m: number, n: number, target: number): number {
    if (houses.length > 0) {
        let index = 0;
        while (houses[index] === 0 && index < houses.length) {
            index += 1;
        }
        if (houses[index]) {
            let init = houses[index];
            let count = 1;
            index += 1;
            while (index < houses.length) {
                if (houses[index] === 0) {
                    index += 1;
                    continue;
                }
                if (houses[index] === init) {
                    index += 1;
                    continue;
                }
                count += 1;
                init = houses[index];
                index += 1;
            }
            if (count > target) {
                return -1;
            }
        }
    }
    const indexesToFill = [];
    for (let index = 0; index < houses.length; index++) {
        if (houses[index] === 0) {
            indexesToFill.push(index);
        }
    }
    console.log(indexesToFill);
    const colors = cost[0].length;
    // brute-brute force

    return 0;
};

function countNeighborhoods(houses: number[]): number {
    let result = 1;
    let current = houses[0];
    for (let index = 1; index < houses.length; index++) {
        if (houses[index] !== current) {
            result += 1;
            current = houses[index];
        }
    }
    return result;
}