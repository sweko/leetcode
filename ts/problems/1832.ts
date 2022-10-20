import { Problem } from "../model";

export const problem: Problem<string, boolean> = {
    name: 'Check if the Sentence Is Pangram',
    id: 1832,
    url: 'https://leetcode.com/problems/check-if-the-sentence-is-pangram/',
    solution: checkIfPangram,
    tests: [
        {
            id: 1,
            argument: "thequickbrownfoxjumpsoverthelazydog",
            result: true
        },
        {
            id: 2,
            argument: "leetcode",
            result: false
        }
    ]
}

function checkIfPangram(sentence: string): boolean {
    const set = new Set<string>();
    for (const char of sentence) {
        set.add(char);
    }
    return set.size === 26;
};