import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number|null)[], number> = {
    name: 'Count Good Nodes in Binary Tree',
    id: 1448,
    url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/',
    solution: wrapTree(goodNodes),
    tests: [
        {
            id: 1,
            argument: [3,1,4,3,null,1,5],
            result: 4
        },
        {
            id: 2,
            argument: [3,3,null,4,2],
            result: 3
        },
        {
            id: 3,
            argument: [1],
            result: 1
        }
    ]
}

const countGoodNodes = (root: TreeNode | null, max: number): number => {
    if (root === null) {
        return 0;
    }
    let result = 0;
    if (root.val >= max) {
        max = root.val;
        result += 1;
    }
    return result + countGoodNodes(root.left, max) + countGoodNodes(root.right, max);
};

function goodNodes(root: TreeNode | null): number {
    return countGoodNodes(root, Number.NEGATIVE_INFINITY);
};

