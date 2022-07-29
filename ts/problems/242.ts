import { Problem } from "../model";
import { arrayToTree, TreeNode} from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<[string, string], boolean> = {
    name: 'Valid Anagram',
    id: 242,
    url: 'https://leetcode.com/problems/valid-anagram/',
    solution: paramWrapper(isAnagram),
    tests: [
        {
            id: 1,
            argument: ["anagram", "nagaram"],
            result: true
        },
        {
            id: 2,
            argument: ["rat", "car"],
            result: false
        }
    ]
}

function toHistogram(input: string): Record<string, number> {
    const result: Record<string, number> = {};
    for (const char of input) {
        if (result[char]) {
            result[char] += 1;
        } else {
            result[char] = 1;
        }
    }
    return result;
}

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false;
    }
    const shist = toHistogram(s);
    const thist = toHistogram(t);

    for (const key in shist) {
        if (!thist[key]) {
            return false;
        }
        if (shist[key] !== thist[key]) {
            return false;
        }
    }
    return true;
};