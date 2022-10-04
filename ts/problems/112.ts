import { Problem } from "../model";
import { arrayToTree, TreeNode} from "../tree-utils";

const wrapper = (func:(root: TreeNode | null, targetSum: number) => boolean) => ([root, targetSum]:[(number|null)[], number]) => func(arrayToTree(root), targetSum);

export const problem: Problem<[(number|null)[], number], boolean> = {
    name: 'Path Sum II',
    id: 98,
    url: 'https://leetcode.com/problems/path-sum-ii/',
    solution: wrapper(hasPathSum),
    tests: [
        {
            id: 1,
            argument: [[5,4,8,11,null,13,4,7,2,null,null,5,1], 22],
            result: true
        },
        {
            id: 2,
            argument:  [[1,2,3], 5],
            result: false
        },
        {
            id: 3,
            argument: [[], 0],
            result: false
        }
    ]
}

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    // the wrong way around, uses the 113 solution
    const sums = pathSum(root, targetSum);
    return sums.length > 0;
};

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