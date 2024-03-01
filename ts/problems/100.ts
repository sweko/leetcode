import { Problem } from "../model";
import { arrayToTree, TreeNode } from "../tree-utils";

const wrapper = (func: (first: TreeNode | null, second: TreeNode | null) => boolean) => ([first, second]: [(number | null)[], (number | null)[]]) => func(arrayToTree(first), arrayToTree(second));

export const problem: Problem<[(number | null)[], (number | null)[]], boolean> = {
    name: 'Same Tree',
    id: 100,
    url: 'https://leetcode.com/problems/same-tree',
    solution: wrapper(isSameTree),
    tests: [
        {
            id: 1,
            argument: [[1, 2, 3], [1, 2, 3]],
            result: true
        },
        {
            id: 2,
            argument: [[1, 2], [1, null, 2]],
            result: false
        },
        {
            id: 3,
            argument: [[1, 2, 1], [1, 1, 2]],
            result: false
        }
    ]
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) {
        return true;
    }
    if (p === null || q === null) {
        return false;
    }
    if (p.val !== q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};