import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number | null)[], number[][]> = {
    name: 'Vertical Order Traversal of a Binary Tree',
    id: 987,
    url: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/',
    solution: wrapTree(verticalTraversal),
    tests: [
        {
            id: 1,
            argument: [3, 9, 20, null, null, 15, 7],
            result: [[9], [3, 15], [20], [7]]
        },
        {
            id: 2,
            argument: [1, 2, 3, 4, 5, 6, 7],
            result: [[4], [2], [1, 5, 6], [3], [7]]
        },
        {
            id: 3,
            argument: [1, 2, 3, 4, 6, 5, 7],
            result: [[4], [2], [1, 5, 6], [3], [7]]
        },
        {
            id: 4,
            argument: [1],
            result: [[1]]
        }
    ]
}

type Position = {
    node: TreeNode,
    row: number;
    col: number;
}

type PosValue = {
    value: number,
    row: number;
}

function verticalTraversal(root: TreeNode|null): number[][] {
    if (root === null) {
        return [];
    }
    const positions: Record<number, PosValue[]> = {};
    const queue: Position[] = [{ node: root, row: 0, col: 0 }];

    while (queue.length !== 0) {
        const { node, row, col } = queue.shift()!;
        if (!positions[col]) {
            positions[col] = [];
        }
        positions[col].push({ value: node.val, row });
        if (node.left) {
            queue.push({
                node: node.left,
                row: row + 1,
                col: col - 1
            });
        }
        if (node.right) {
            queue.push({
                node: node.right,
                row: row + 1,
                col: col + 1
            });
        }
    }

    const result = Object.keys(positions)
        .map(key => Number(key))
        .sort((a, b) => a-b)
        .map(column => positions[column].sort((a, b) => {
            if (a.row !== b.row) {
                return a.row - b.row;
            }
            return a.value - b.value;
        }).map(pos => pos.value));

    return result;
};
