import { Problem } from "../model";
import { TreeNode, wrapTree} from "../tree-utils";

export const problem: Problem<(number|null)[], string> = {
    name: 'Construct String from Binary Tree',
    id: 606,
    url: 'https://leetcode.com/problems/construct-string-from-binary-tree/',
    solution: wrapTree(tree2str),
    tests: [
        {
            id: 1,
            argument: [1,2,3,4],
            result: "1(2(4))(3)"
        },
        {
            id: 2,
            argument: [1,2,3,null,4],
            result: "1(2()(4))(3)"
        }
    ]
}

function tree2str(root: TreeNode | null): string {
    if (root === null) {
        return "";
    }
    let result = `${root.val}`;
    if (root.right === null) {
        if (root.left === null) {
            return result;
        }
        return `${result}(${tree2str(root.left)})`;
    }
    if (root.left === null) {
        return `${result}()(${tree2str(root.right)})`;
    }
    return `${result}(${tree2str(root.left)})(${tree2str(root.right)})`;
};