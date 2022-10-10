import { Problem } from "../model";
import { TreeNode, wrapTreeWithParam } from "../tree-utils";

export const problem: Problem<[(number|null)[], number], boolean> = {
    name: 'Two Sum IV - Input is a BST',
    id: 653,
    url: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/',
    solution: wrapTreeWithParam(findTarget),
    tests: [
        {
            id: 1,
            argument: [[5,3,6,2,4,null,7], 9],
            result: true
        },
        {
            id: 2,
            argument: [[5,3,6,2,4,null,7], 28],
            result: false
        },
        {
            id: 3,
            argument: [[2,1,3], 4],
            result: true
        }
    ]
}

function find(node:TreeNode|null, value: number) : TreeNode | null {
    if (node === null) {
        return null;
    }
    if (node.val === value) {
        return node;
    }

    return find(node.val > value ? node.left : node.right, value);
}

function findTarget(root: TreeNode | null, k: number): boolean {
    if (root === null) {
        return false;
    }
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift()!;
        const complement = find(root, k - node.val);
        if (complement !== null && complement !== node) {
            return true;
        }
        if (node.left !== null) {
            queue.push(node.left);
        }
        if (node.right !== null) {
            queue.push(node.right);
        }
    }
    return false;
};