import { Problem } from "../model";
import { arrayToTree, TreeNode} from "../tree-utils";

const wrapper = (func:(root: TreeNode | null, targetSum: number) => number[][]) => ([root, targetSum]:[(number|null)[], number]) => func(arrayToTree(root), targetSum);

export const problem: Problem<[(number|null)[], number], number[][]> = {
    name: 'Path Sum II',
    id: 98,
    url: 'https://leetcode.com/problems/path-sum-ii/',
    solution: wrapper(pathSum),
    tests: [
        {
            id: 1,
            argument: [[5,4,8,11,null,13,4,7,2,null,null,5,1], 22],
            result: [[5,4,11,2],[5,8,4,5]]
        },
        {
            id: 2,
            argument:  [[1,2,3], 5],
            result: []
        },
        {
            id: 3,
            argument: [[1,2], 0],
            result: []
        }
    ]
}

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];
    if (!root) {
        return result;
    }
    const queue: [TreeNode, number, number[]][] = [[root, root.val, [root.val]]];
    while (queue.length) {
        const [node, sum, path] = queue.shift()!;
        if (node.left === null && node.right === null) {
            if (sum === targetSum) {
                result.push(path);
            }
        }
        if (node.left) {
            queue.push([node.left, sum + node.left.val, [...path, node.left.val]]);
        }
        if (node.right) {
            queue.push([node.right, sum + node.right.val, [...path, node.right.val]]);
        }
    }
    return result;
};