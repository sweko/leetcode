import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number|null)[], number[]> = {
    name: 'Average of Levels in Binary Tree',
    id: 637,
    url: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/',
    solution: wrapTree(averageOfLevels),
    tests: [
        {
            id: 1,
            argument: [3,9,20,null,null,15,7],
            result: [3.00000,14.50000,11.00000]
        },
        {
            id: 2,
            argument: [3,9,20,15,7],
            result: [3.00000,14.50000,11.00000]
        }
    ]
}

function averageOfLevels(root: TreeNode | null): number[] {
    if (root === null) {
        return [];
    }
    const queue: {node: TreeNode, level: number}[] = [{ node: root, level: 0}];
    const results: {sum: number, count: number}[] = [];

    while (queue.length !== 0) {
        const {node, level} = queue.shift()!;
        if (results[level] === undefined) {
            results[level] = {sum: 0, count: 0};
        }
        results[level].sum += node.val;
        results[level].count += 1;
        if (node.left) {
            queue.push({node: node.left, level: level + 1});
        }
        if (node.right) {
            queue.push({node: node.right, level: level + 1});
        }
    }
    return results.map(({sum, count}) => sum / count);
};
