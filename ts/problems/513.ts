import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number | null)[], number> = {
    name: 'Find Bottom Left Tree Value',
    id: 513,
    url: 'https://leetcode.com/problems/find-bottom-left-tree-value/',
    solution: wrapTree(findBottomLeftValue),
    tests: [
        {
            id: 1,
            argument: [2,1,3],
            result: 1
        },
        {
            id: 2,
            argument: [1,2,3,4,null,5,6,null,null,7],
            result: 7
        },
        {
            id: 3,
            argument: [1],
            result: 1
        }
    ]
}

function findBottomLeftValue(root: TreeNode | null): number {
    if (root == null) {
        return 0;
    }
    const queue: TreeNode[] = [root];
    let result = root.val;
    while (queue.length > 0) {
        const node = queue.shift()!;
        if (node.right !== null) {
            queue.push(node.right);
        }
        if (node.left !== null) {
            queue.push(node.left);
            result = node.left.val;
        }
        result = node.val;
    }
    return result;
};