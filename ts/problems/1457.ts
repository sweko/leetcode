import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number|null)[], number> = {
    name: 'Pseudo-Palindromic Paths in a Binary Tree',
    id: 1457,
    url: 'https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/',
    solution: wrapTree(pseudoPalindromicPaths),
    tests: [
        {
            id: 1,
            argument: [2,3,1,3,1,null,1],
            result: 2
        },
        {
            id: 2,
            argument: [2,1,1,1,3,null,null,null,null,null,1],
            result: 1
        },
        {
            id: 3,
            argument: [9],
            result: 1
        }
    ]
}

function countNode(node: TreeNode, path: number[]): number {
    const nextPath = path.slice();
    if (nextPath.includes(node.val)) {
        nextPath.splice(nextPath.indexOf(node.val), 1);
    } else {
        nextPath.push(node.val);
    }
    if ((node.left === null) && (node.right === null)) {
        // leaf
        return (nextPath.length <= 1) ? 1 : 0;
    } else {
        const left = node.left ? countNode(node.left, nextPath) : 0;
        const right = node.right ? countNode(node.right, nextPath) : 0;
        return left + right;
    }
}

function pseudoPalindromicPaths (root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    return countNode(root, []);
};