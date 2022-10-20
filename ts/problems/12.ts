import { Problem } from "../model";

export const problem: Problem<number, string> = {
    name: 'Integer to Roman',
    id: 12,
    url: 'https://leetcode.com/problems/integer-to-roman/',
    solution: intToRoman,
    tests: [
        {
            id: 1,
            argument: 3,
            result: "III"
        },
        {
            id: 2,
            argument:  58,
            result: "LVIII"
        },
        {
            id: 3,
            argument: 1994,
            result: "MCMXCIV"
        }
    ]
}

const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
];

function intToRoman(num: number): string {
    const result = [];
    while (num > 0) {
        const key = map.find(([k]) => k <= num);
        if (key) {
            result.push(key[1]);
            num -= key[0];
        }
    }
    return result.join("");
};