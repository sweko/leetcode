import { Problem } from "../model";

export const problem: Problem<string, number> = {
    name: 'Roman to Integer',
    id: 13,
    url: 'https://leetcode.com/problems/roman-to-integer/',
    solution: romanToInt,
    tests: [
        {
            id: 1,
            argument: "III",
            result: 3
        },
        {
            id: 2,
            argument:  "LVIII",
            result: 58
        },
        {
            id: 3,
            argument: "MCMXCIV",
            result: 1994
        }
    ]
}

const map: Record<string, number> = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}

function romanToInt(s: string): number {
    let result = 0;
    let active = ""
    const subtracts = ["I", "X", "C"];
    const leads = [["V", "X"], ["L", "C"], ["D", "M"]];
    for (let index = s.length-1; index >= 0; index--) {
        const roman = s[index];
        const sindex = subtracts.indexOf(roman);
        if (sindex !== -1) {
            if (leads[sindex].includes(active)) {
                result -= 2 * map[roman];
            }
        }
        active = roman;
        result += map[roman];
    }
    return result;
};