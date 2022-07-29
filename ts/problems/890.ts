import { Problem } from "../model";
import { arrayToTree, TreeNode} from "../tree-utils";
import { paramWrapper } from "../utils";

export const problem: Problem<[string[], string], string[]> = {
    name: 'Find and Replace Pattern',
    id: 890,
    url: 'https://leetcode.com/problems/find-and-replace-pattern/',
    solution: paramWrapper(findAndReplacePattern),
    tests: [
        {
            id: 1,
            argument: [["abc","deq","mee","aqq","dkd","ccc"], "abb"],
            result: ["mee","aqq"]
        },
        {
            id: 2,
            argument: [["a","b","c"], "a"],
            result: ["a","b","c"]
        }
    ]
}

function toPattern(input: string): number[] {
    const mapper: Record<string, number> = {};
    const result: number[] = [];
    let current = 0;

    for (const char of input) {
        if (mapper[char]) {
            result.push(mapper[char]);
        } else {
            current += 1;
            mapper[char] = current;
            result.push(current);
        }
    }
    return result;
}

function compare(first: number[], second: number[]) {
    if (first.length !== second.length) {
        return false;
    }
    for (let index = 0; index < first.length; index++) {
        if (first[index] !== second[index]) {
            return false;
        }
    }
    return true;
}

function findAndReplacePattern(words: string[], pattern: string): string[] {
    const wpatterns = words.map(word => ({word, pattern: toPattern(word)}));
    const ppattern = toPattern(pattern);
    return wpatterns.filter(wp => compare(wp.pattern, ppattern)).map(wp => wp.word);
};