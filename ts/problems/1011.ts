// https://leetcode.com/problems/longest-string-chain/

import { Problem } from "../model";
import { paramWrapper, toValuesArray } from "../utils";

export const problem: Problem<[number[], number], number> = {
    name: 'Capacity To Ship Packages Within D Days',
    id: 1011,
    url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    tests: [
        {
            id: 1,
            argument: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5],
            result: 15
        },
        {
            id: 2,
            argument: [[3, 2, 2, 4, 1, 4], 3],
            result: 6
        },
        {
            id: 3,
            argument: [[1, 2, 3, 1, 1], 4],
            result: 3
        }
    ],
    solution: paramWrapper(shipWithinDays)
}

function shipWithinDays(weights: number[], days: number): number {
    console.log("----");

    let min = weights.reduce((a, b) => Math.max(a, b), 0);
    let max = weights.reduce((a, b) => a + b, 0);

    while (min < max) {
        const mid = Math.floor((min + max) / 2);
        if (canShip(weights, days, mid)) {
            max = mid;
        } else {
            min = mid + 1;
        }
    }

    return min;
};

function canShip(weights: number[], days: number, capacity: number): boolean {
    console.log(`capacity: ${capacity}`)
    let currentDay = 1;
    let currentWeight = 0;

    for (const weight of weights) {
        if (currentWeight + weight > capacity) {
            currentDay++;
            currentWeight = 0;
        }
        currentWeight += weight;
    }

    return currentDay <= days;
}
