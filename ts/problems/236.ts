import { Problem } from "../model";
import { arrayToTree, TreeNode} from "../tree-utils";

const wrapProblemParams = (func: (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null) => TreeNode | null) => {
    return (params: [(number | null)[], number, number]) => {
        const [nodeArray, pnum, qnum] = params;
        const tree = arrayToTree(nodeArray);
        const result = func(tree, new TreeNode(pnum), new TreeNode(qnum));
        if (result === null) {
            return null;
        }
        return result.val;
    }
}

export const problem: Problem<[(number|null)[], number, number], number | null> = {
    name: 'Lowest Common Ancestor of a Binary Tree',
    id: 236,
    url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
    solution: wrapProblemParams(lowestCommonAncestor),
    tests: [
        {
            id: 1,
            argument: [[3,5,1,6,2,0,8,null,null,7,4], 5, 4],
            result: 5
        },
        {
            id: 2,
            argument: [[3,5,1,6,2,0,8,null,null,7,4], 5, 1],
            result: 3
        },
        {
            id: 3,
            argument: [[1,2], 1, 2],
            result: 1
        }
    ]
}

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null;
    }
    if (p === null) {
        return null;
    }
    if (q === null) {
        return null;
    }

    const pparents = getParents(root, p.val);
    const qparents = getParents(root, q.val);
    let index = 0;
    while (pparents[index] === qparents[index])
    {
        index += 1;
        if (pparents.length === index || qparents.length === index)
        {
            return new TreeNode(pparents[index - 1]);
        }
    }
    return new TreeNode(pparents[index - 1]);
};

function getParents(root: TreeNode, value: number): number[] {
    if (root.val === value) {
        return [root.val];
    }
    if (root.left !== null) {
        const lparent = getParents(root.left, value);
        if (lparent.length !== 0) {
            lparent.unshift(root.val);
            return lparent;
        }
    }

    if (root.right !== null) {
        var rparent = getParents(root.right, value);
        if (rparent.length !== 0) {
            rparent.unshift(root.val);
            return rparent;
        }
    }
    return [];
}
