import { Problem } from "../model";

export const problem: Problem<string[], number> = {
    name: 'Short Encoding of Words',
    id: 820,
    url: 'https://leetcode.com/problems/short-encoding-of-words/',
    solution: minimumLengthEncoding,
    tests: [
        {
            id: 1,
            argument: ["time", "me", "bell"],
            result: 10
        },
        {
            id: 2,
            argument:  ["t"],
            result: 2
        }
    ]
}

function minimumLengthEncoding(words: string[]): number {
    const sorted = words.slice().sort((f, s) => s.length - f.length);
    const results: string[] = [];
    let len = 0;
    for (const word of sorted) {
        if (results.some(w => w.endsWith(word))) {
            continue;
        }
        results.push(word);
        len += word.length + 1;
    }
    return len;
};
