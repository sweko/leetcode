import { Problem } from "../model";

export const problem: Problem<string[], number> = {
    name: 'Maximum Length of a Concatenated String with Unique Characters',
    id: 1239,
    url: 'https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/',
    solution: maxLength,
    tests: [
        {
            id: 1,
            argument: ["un","iq","ue"],
            result: 4
        },
        {
            id: 2,
            argument: ["cha","r","act","ers"],
            result: 6
        },
        {
            id: 3,
            argument: ["abcdefghijklmnopqrstuvwxyz"],
            result: 26
        },
        {
            id: 4,
            argument: ["yy","bkhwmpbiisbldzknpm"],
            result: 0
        },
        {
            id: 5,
            argument: ["aa","bb"],
            result: 0
        },
    ]
}

const hasIntersection = (first: Record<string, number>, second: Record<string, number>): boolean => {
    for (const char in first) {
        if (second[char]) {
            return true;
        }
    }
    return false;
}

const toHistogram = (str: string): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const char of str) {
        result[char] = (result[char] || 0) + 1;
    }
    return result;
}

const isSingleChar = (histogram:  Record<string, number>): boolean => {
    for (const char in histogram) {
        if (histogram[char] > 1) {
            return false;
        }
    }
    return true;
}


function maxLength(arr: string[]): number {
    const histograms = arr.map(toHistogram).filter(isSingleChar);
    const result: Record<string, number>[] = [];
    for (const histogram of histograms) {
        const filtered = result.filter((item) => !hasIntersection(item, histogram));
        for (const item of filtered) {
            const combined = { ...item, ...histogram };
            result.push(combined);
        }
        result.push(histogram);
    }
    return result.reduce((max, item) => Math.max(max, Object.keys(item).length), 0);
};