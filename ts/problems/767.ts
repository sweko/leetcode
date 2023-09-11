import { Problem } from "../model";

export const problem: Problem<string, string> = {
    name: 'Reorganize String',
    id: 767,
    url: 'https://leetcode.com/problems/reorganize-string/',
    solution: reorganizeString,
    tests: [
        {
            id: 1,
            argument: "aab",
            result: "aba"
        },
        {
            id: 2,
            argument: "aaab",
            result: ""
        },
        {
            id: 3,
            argument: "vvvlo",
            result: "vlvov"
        },
        {
            id: 4,
            argument: "bfrbs",
            result: "bfrbs"
        },
        {
            id: 5,
            argument: "eqmeyggvp",
            result: "epeqgvgym"
        },
    ]
}

const toHistogram = (str: string): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const char of str) {
        result[char] = (result[char] || 0) + 1;
    }
    return result;
}

const testString = (s: string): boolean => {
    for (let index = 0; index < s.length - 1; index++) {
        if (s[index] === s[index+1]) {
            return true;
        }
    }
    return false;
}

const getMaxChar = (histogram: Record<string, number>): string => {
    let maxChar = '';
    let maxCount = 0;
    for (const char in histogram) {
        if (histogram[char] > maxCount) {
            maxChar = char;
            maxCount = histogram[char];
        }
    }
    return maxChar;
}

const getMaxCharExcept = (histogram: Record<string, number>, except: string): string => {
    let maxChar = '';
    let maxCount = 0;
    for (const char in histogram) {
        if (char === except) {
            continue;
        }
        if (histogram[char] > maxCount) {
            maxChar = char;
            maxCount = histogram[char];
        }
    }
    return maxChar;
}

function reorganizeString(s: string): string {
    if (!testString(s)) {
        // no need to do anything, it's already good
        return s;
    }

    const histogram = toHistogram(s);
    const char = getMaxChar(histogram);
    if (histogram[char] > (s.length + 1) / 2) {
        // impossible to reorganize
        return "";
    }

    let result = char;
    histogram[char] -= 1;

    while (result.length < s.length) {
        const nextChar = getMaxCharExcept(histogram, result[result.length - 1]);
        result += nextChar;
        histogram[nextChar] -= 1;
    }

    return result;
};

