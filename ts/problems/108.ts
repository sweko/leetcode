import { Problem } from "../model";
import { TreeNode, arrayToTree, treeToArray } from "../tree-utils";

const wrapProblemParams = (func: (nums: number[]) => TreeNode | null) => {
    return (nums: number[]) => {
        const result = func(nums);
        if (result === null) {
            return [];
        }
        return treeToArray(result)
    }
}

export const problem: Problem<number[], (number|null)[]> = {
    name: 'Binary Trees With Factors',
    id: 823,
    url: 'https://leetcode.com/problems/binary-trees-with-factors/',
    solution: wrapProblemParams(sortedArrayToBST),
    tests: [
        {
            id: 1,
            argument: [-10,-3,0,5,9],
            result: [0,-3,9,-10,null,5]
        },
        {
            id: 2,
            argument: [1,3],
            result: [3,1]
        }
    ]
}

function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (nums.length === 0) {
        return null;
    }
    const mindex = Math.floor(nums.length / 2);
    const left = nums.slice(0, mindex);
    const right = nums.slice(mindex+1);
    return new TreeNode(nums[mindex], sortedArrayToBST(left), sortedArrayToBST(right));
};