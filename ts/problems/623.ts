import { Problem } from "../model";
import { arrayToTree, TreeNode, treeToArray, wrapTree } from "../tree-utils";

const wrapper = (func:(root: TreeNode | null, val: number, depth: number) => TreeNode | null) => 
    ([root, val, depth]:[(number|null)[], number, number]) => {
        const result = func(arrayToTree(root), val, depth);
        return treeToArray(result);
    }
    


export const problem: Problem<[(number|null)[], number, number], (number|null)[]> = {
    name: 'Average of Levels in Binary Tree',
    id: 637,
    url: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/',
    solution: wrapper(addOneRow),
    tests: [
        {
            id: 1,
            argument:  [[4,2,6,3,1,5], 1, 2],
            result:[4,1,1,2,null,null,6,3,1,5]
        },
        {
            id: 2,
            argument: [[4,2,null,3,1], 1, 3],
            result: [4,2,null,1,1,3,null,null,1]
        }
    ]
}

function addOneRow(root: TreeNode, val: number, depth: number): TreeNode | null {
    // generated by Github Copilot
    if (depth === 1) {
        return new TreeNode(val, root, null);
    }
    const queue: [TreeNode, number][] = [[root, 1]];
    while (queue.length) {
        const [node, level] = queue.shift()!;
        if (level === depth - 1) {
            node.left = new TreeNode(val, node.left, null);
            node.right = new TreeNode(val, null, node.right);
        } else {
            if (node.left) {
                queue.push([node.left, level + 1]);
            }
            if (node.right) {
                queue.push([node.right, level + 1]);
            }
        }
    }
    return root;

};