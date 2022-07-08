import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[][], number], number> = {
    name: 'Maximum Units on a Truck',
    id: 1710,
    url: 'https://leetcode.com/problems/maximum-units-on-a-truck/',
    solution: paramWrapper(maximumUnits),
    tests: [
        {
            id: 1,
            argument: [[[1,3],[2,2],[3,1]], 4],
            result: 8
        },
        {
            id: 2,
            argument: [[[5,10],[2,5],[4,7],[3,9]], 10],
            result: 91
        }
    ]
}

function maximumUnits(boxTypes: number[][], truckSize: number): number {
    boxTypes.sort((a,b) => b[1] - a[1]);
    let totalUnits = 0;
    let totalBoxes = 0;
    for (const boxType of boxTypes) {
        if (totalBoxes + boxType[0] >= truckSize) {
            const count = truckSize - totalBoxes;
            totalUnits += count * boxType[1];
            return totalUnits;
        }
        totalUnits += boxType[0] * boxType[1];
        totalBoxes += boxType[0];
    }
    return totalUnits;
};
