import { Problem } from "../model";
import { TreeNode, wrapTree } from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<[string, number], number> = {
    name: 'String Compression II',
    id: 1531,
    url: 'https://leetcode.com/problems/string-compression-ii/',
    solution: paramWrapper(getLengthOfOptimalCompression),
    tests: [
        {
            id: 1,
            argument: ["aaabcccd", 2],
            result: 4
        },
        {
            id: 2,
            argument: ["aabbaa", 2],
            result: 2
        },
        {
            id: 3,
            argument: ["aaaaaaaaaaa", 0],
            result: 3
        }
    ]
}

function getLengthOfOptimalCompression(s: string, k: number): number {
    return -1;
};