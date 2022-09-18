import { Problem } from "../model";
import { TreeNode, treeToArray } from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number[]], (number | null)[]> = {
    name: 'Construct Binary Tree from Preorder and Inorder Traversal',
    id: 105,
    url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    solution: paramWrapper(buildTree),
    tests: [
        {
            id: 1,
            argument:  [[3,9,20,15,7], [9,3,15,20,7]],
            result: [3,9,20,null,null,15,7]
        },
        {
            id: 2,
            argument: [[-1], [-1]],
            result: [-1]
        }
    ]
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) {
        return null;
    }

    const root = preorder[0];
    const ri = inorder.indexOf(root);
    const inleft = inorder.slice(0, ri);
    const inright = inorder.slice(ri+1);
    const preleft = preorder.slice(1, inleft.length+1);
    const preright = preorder.slice(1 + inleft.length);
    return new TreeNode(root, buildTree(preleft, inleft), buildTree(preright, inright));
};

// type Type = {decision: string, count: number};

// const data = ['a', 'b', 'b'];
// const result: Record<string, Type> = {};
// for (const decision of data) {
//     if (result[decision]) {
//         result[decision].count += 1
//     } else {
//         result[decision] = {decision, count: 1}
//     }
// }

// const output =  Object.keys(result).reduce((acc:Type[], item) => [...acc, result[item]], []);


