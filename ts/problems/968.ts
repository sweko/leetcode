import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";

export const problem: Problem<(number|null)[], number> = {
    name: 'Binary Tree Cameras',
    id: 968,
    url: 'https://leetcode.com/problems/binary-tree-cameras/',
    solution: wrapTree(minCameraCover),
    tests: [
        {
            id: 1,
            argument: [0,0,null,0,0],
            result: 1
        },
        {
            id: 2,
            argument: [0,0,null,0,null,0,null,null,0],
            result: 2
        },
        {
            id: 3,
            argument: [],
            result: 0
        }
    ]
}

function minCameraCover(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    return -1;
};
