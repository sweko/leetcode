import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number | null)[], number> = {
    name: 'Diameter of Binary Tree',
    id: 543,
    url: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    solution: wrapTree(diameterOfBinaryTree),
    tests: [
        {
            id: 1,
            argument: [1,2,3,4,5],
            result: 3
        },
        {
            id: 2,
            argument: [1,2],
            result: 1
        },
        {
            id: 3,
            argument: [1],
            result: 0
        }
    ]
}

function diameterOfBinaryTree(root: TreeNode | null): number {
    if (root == null) {
        return 0;
    }
    const lh = height(root.left);
    const lr = height(root.right);
    const ld = diameterOfBinaryTree(root.left);
    const rd = diameterOfBinaryTree(root.right);
    const od = lh+lr;
    return Math.max(Math.max(ld, rd), od);
};

function height(node: TreeNode | null): number {
    if (node == null) {
        return 0;
    }
    return Math.max(height(node.left), height(node.right)) + 1;
}