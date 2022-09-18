import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number|null)[], boolean> = {
    name: 'Validate Binary Search Tree',
    id: 98,
    url: 'https://leetcode.com/problems/validate-binary-search-tree/',
    solution: wrapTree(isValidBST),
    tests: [
        {
            id: 1,
            argument: [2,1,3],
            result: true
        },
        {
            id: 2,
            argument:  [5,1,4,null,null,3,6],
            result: false
        },
        {
            id: 3,
            argument: [2,2,2],
            result: false
        },
        {
            id: 4,
            argument: [5,4,6,null,null,3,7],
            result: false
        }
    ]
}

function min(root: TreeNode): number {
    return Math.min(
        root.val,
        root.left ? min(root.left) : Number.POSITIVE_INFINITY,
        root.right ? min(root.right) : Number.POSITIVE_INFINITY,
    );
}

function max(root: TreeNode): number {
    return Math.max(
        root.val,
        root.left ? max(root.left) : Number.NEGATIVE_INFINITY,
        root.right ? max(root.right) : Number.NEGATIVE_INFINITY,
    );
}


function isValidBST(root: TreeNode | null): boolean {
    if (root === null) {
        return false;
    }
    if (root.left !== null) {
        if (max(root.left) >= root.val) {
            return false;
        }
        if (!isValidBST(root.left)) {
            return false;
        }
    }
    if (root.right !== null) {
        if (min(root.right) <= root.val) {
            return false;
        }
        if (!isValidBST(root.right)) {
            return false;
        }
    }
    return true;
};