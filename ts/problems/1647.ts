import { Problem } from "../model";

export const problem: Problem<string, number> = {
    name: 'Minimum Deletions to Make Character Frequencies Unique',
    id: 1647,
    url: 'https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique',
    solution: minDeletions,
    tests: [
        {
            id: 1,
            argument: "aab",
            result: 0
        },
        {
            id: 2,
            argument: "aaabbbcc",
            result: 2
        },
        {
            id: 3,
            argument: "ceabaacb",
            result: 2
        },
        {
            id: 4,
            argument: "bbcebab",
            result: 2
        }
    ]
}

const makeHistogram = (word: string):number[] => {
    const result: number[] = Array(26).fill(0);
    for (const char of word) {
        const index = char.charCodeAt(0)-97;
        result[index] += 1;
    }
    return result.filter(x => x > 0).sort((a, b) => b - a);
}

function minDeletions(s: string): number {
    if (s.length === 0) {
        return 0;
    }
    const hist = makeHistogram(s);
    let current = hist[0];
    let result = 0;
    for (let index = 1; index < hist.length; index++) {
        if (hist[index] >= current) {
            current = current ? current - 1 : 0;
            result += hist[index] - current;
        } else {
            current = hist[index];
        }
    }
    return result;
};