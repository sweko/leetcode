import { Problem } from "../model";
import { TreeNode, wrapTree} from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<[string, number[]], number> = {
    name: 'Minimum Time to Make Rope Colorful',
    id: 1578,
    url: 'https://leetcode.com/problems/minimum-time-to-make-rope-colorful/',
    solution: paramWrapper(minCost),
    tests: [
        {
            id: 1,
            argument: ["abaac", [1,2,3,4,5]],
            result: 3
        },
        {
            id: 2,
            argument: ["abc", [1,2,3]],
            result: 0
        },
        {
            id: 3,
            argument: ["aabaa", [1,2,3,4,1]],
            result: 2
        },
        {
            id: 4,
            argument: ["bbbaaa", [4,9,3,8,8,9]],
            result: 23
        }
    ]
}

function minCost(colors: string, neededTime: number[]): number {
    let current = colors[0];
    let max = neededTime[0];
    let sum = neededTime[0];
    let isDouble = false;
    let result = 0;
    for (let index = 1; index < colors.length; index++) {
        const color = colors[index];
        if (color === current) {
            isDouble = true;
            max = Math.max(max, neededTime[index]);
            sum += neededTime[index];
        } else {
            if (isDouble) {
                result += sum - max;
            }
            isDouble = false;
            current = color;
            max = neededTime[index];
            sum = neededTime[index];
        }
    }
    if (isDouble) {
        result += sum - max;
    }
    return result;
};