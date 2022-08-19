import { Problem } from "../model";

export const problem: Problem<string[], number> = {
    name: 'First Unique Character in a String',
    id: 387,
    url: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
    solution: uniqueMorseRepresentations,
    tests: [
        {
            id: 1,
            argument:  ["gin","zen","gig","msg"],
            result: 2
        },
        {
            id: 2,
            argument:  ["a"],
            result: 1
        }
    ]
}

const morseMap: Record<string, string> = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i :"..",
    j:".---",
    k:"-.-",
    l:".-..",
    m:"--",
    n:"-.",
    o:"---",
    p:".--.",
    q:"--.-",
    r:".-.",
    s:"...",
    t:"-",
    u:"..-",
    v:"...-",
    w:".--",
    x:"-..-",
    y:"-.--",
    z:"--.."
}

function uniqueMorseRepresentations(words: string[]): number {
    return new Set(words.map(w => w.split("").map(c => morseMap[c]).join(""))).size;
};


