// https://leetcode.com/problems/delete-operation-for-two-strings/

import { Problem } from "../model";

export const problem: Problem<{word1: string, word2: string}, number> = {
    name: 'Delete Operation for Two Strings',
    id: 583,
    url: 'https://leetcode.com/problems/delete-operation-for-two-strings/',
    solution: ({word1, word2}) => minDistance(word1, word2),
    tests: [
        {
            id: 1,
            argument: { word1: "sea", word2 : "eat"},
            result: 2
        },
        {
            id: 2,
            argument: { word1: "delete", word2 : "leet"},
            result: 4
        },
        {
            id: 3,
            argument: { word1: "intention", word2 : "execution"},
            result: 8
        },
        {
            id: 4,
            argument: { word1: "a", word2 : "b"},
            result: 2
        }
    ]
}

function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;
    const matrix = Array(m+1).fill(0).map((_, i) => Array(n+1).fill(0).map((_,j) => ({
        one: word1[i],
        two: word2[j],
        cost: 0
    })));
    console.log(matrix);
    return -1;
};