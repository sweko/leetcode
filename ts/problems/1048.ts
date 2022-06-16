// https://leetcode.com/problems/longest-string-chain/

import { Hash, Problem, URL } from "../model";
import { toValuesArray } from "../utils";

export const problem: Problem<string[], number> = {
    name: 'Longest String Chain',
    id: 1048,
    url: "https://leetcode.com/problems/longest-string-chain/",
    tests: [
        {
            id: 1,
            argument: ["a", "b", "ba", "bca", "bda", "bdca"],
            result: 4
        },
        {
            id: 2,
            argument: ["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"],
            result: 5
        },
        {
            id: 3,
            argument: ["abcd", "dbqca"],
            result: 1
        }
    ],
    solution: longestStrChain
}

function longestStrChain(words: string[]): number {
    const byLength: string[][] = [];
    for (const word of words) {
        const len = word.length;
        if (!byLength[len]) {
            byLength[len] = [word];
        } else {
            byLength[len].push(word);
        }
    }
    const preds = new Map<string, string[]>();
    for (const word of words) {
        const wordPreds: string[] = [];
        const len = word.length;
        for (let i = 0; i < len; i++) {
            const pred = word.substring(0, i) + word.substring(i + 1);
            if (byLength[len - 1] && byLength[len - 1].includes(pred)) {
                wordPreds.push(pred);
            }
        }
        preds.set(word, wordPreds);
    }

    const chains: Hash<number> = {};

    for (const item of byLength) {
        if (item === undefined) {
            continue;
        }
        for (const word of item) {
            const wordPreds = preds.get(word);
            if (wordPreds === undefined || wordPreds.length === 0) {
                chains[word] = 1;
            }
            const allPreds = wordPreds!.map(p => chains[p]);
            const chainLen = allPreds.length === 0 ? 0 : Math.max(...allPreds);
            chains[word] = chainLen + 1;
        }
    }

    const result = Math.max(...toValuesArray(chains));

    return result;
};

const x : URL<string> = "https://leetcode.com/problems/longest-string-chain/";
