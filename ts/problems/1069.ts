import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number | null)[], boolean> = {
    name: 'Even Odd Tree',
    id: 1069,
    url: 'https://leetcode.com/problems/even-odd-tree',
    solution: wrapTree(isEvenOddTree),
    tests: [
        {
            id: 1,
            argument: [1,10,4,3,null,7,9,12,8,6,null,null,2],
            result: true
        },
        {
            id: 2,
            argument: [5,4,2,3,3,7],
            result: false
        },
        {
            id: 3,
            argument: [5,9,1,3,5,7],
            result: false
        }
    ]
}

function isEvenOddTree(root: TreeNode | null): boolean {
    if (root === null) {
        return false;
    }
    const queue: {node: TreeNode, level: number}[] = [{ node: root, level: 0 }];
    let prevLevel = -1;
    let prevValue = Number.NaN;
    while (queue.length > 0) {
        const { node, level } = queue.shift()!;
        if (level === 0) {
            // special case for the root
            if (node.val % 2 === 0) {
                return false;
            }
            prevLevel = level;
            if (node.left !== null) {
                queue.push({ node: node.left, level: level + 1 });
            }
            if (node.right !== null) {
                queue.push({ node: node.right, level: level + 1 });
            }
            continue;
        }
        if (prevLevel !== level) {
            // switching levels
            prevLevel = level;
            prevValue = node.val;
            if (level % 2 === 1 && node.val % 2 === 1) {
                return false;
            }
            if (level % 2 === 0 && node.val % 2 === 0) {
                return false;
            }
            if (node.left !== null) {
                queue.push({ node: node.left, level: level + 1 });
            }
            if (node.right !== null) {
                queue.push({ node: node.right, level: level + 1 });
            }
            continue;
        }
        if (level % 2 === 1) {
            // even level
            if (node.val % 2 === 1 || node.val >= prevValue) {
                return false;
            }
            prevValue = node.val;
            if (node.left !== null) {
                queue.push({ node: node.left, level: level + 1 });
            }
            if (node.right !== null) {
                queue.push({ node: node.right, level: level + 1 });
            }
            continue;
        }

        // odd level
        if (node.val % 2 === 0 || node.val <= prevValue) {
            return false;
        }
        prevValue = node.val;
        if (node.left !== null) {
            queue.push({ node: node.left, level: level + 1 });
        }
        if (node.right !== null) {
            queue.push({ node: node.right, level: level + 1 });
        }
}
    return true;
};