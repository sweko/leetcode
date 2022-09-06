import { Problem } from "../model";
import { TreeNode, treeToArray, wrapTree } from "../tree-utils";

export const problem: Problem<(number | null)[], (number | null)[]> = {
    name: 'N-ary Tree Level Order Traversal',
    id: 429,
    url: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/',
    solution: (param) => treeToArray(wrapTree(pruneTree)(param)),
    tests: [
        {
            id: 1,
            argument: [1,null,0,0,1],
            result: [1,null,0,null,1]
        },
        {
            id: 2,
            argument: [1,0,1,0,0,0,1],
            result: [1,null,1,null,1]
        }
    ]
}

class OneTreeNode extends TreeNode {
    hasOne: boolean;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        super(val, left, right);
        this.hasOne = false;
    }
}



function pruneTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);

    if (root.left === null && root.right === null) {
        if (root.val === 1) {
            return root;
        } else {
            return null;
        }
    }

    return root;
};

