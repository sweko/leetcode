import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[string, string], string> = {
    name: 'Minimum Window Substring',
    id: 76,
    url: 'https://leetcode.com/problems/minimum-window-substring/',
    solution: paramWrapper(minWindow),
    tests: [
        {
            id: 1,
            argument: ["ADOBECODEBANC", "ABC"],
            result: "BANC"
        },
        {
            id: 2,
            argument: ["a", "a"],
            result: "a"
        },
        {
            id: 3,
            argument: ["a", "aa"],
            result: ""
        }
    ]
}

type Histogram = Record<string, number>;

const asHistogram = (word: string): Histogram => {
    const result: Histogram = {};
    for (const char of word) {
        if (!result[char]) {
            result[char] = 0;
        }
        result[char]++;
    }
    return result;
}


function minWindow(s: string, t: string): string {
    const tHistogram = asHistogram(t);
    const tKeys = Object.keys(tHistogram);
    const tLength = tKeys.length;
    const sLength = s.length;
    let result = "";
    let resultLength = sLength + 1;
    let left = 0;
    let right = 0;
    let currentHistogram: Histogram = {};
    let currentLength = 0;
    while (right < sLength) {
        const char = s[right];
        if (!currentHistogram[char]) {
            currentHistogram[char] = 0;
        }
        currentHistogram[char]++;
        if (tHistogram[char] && (currentHistogram[char] === tHistogram[char])) {
            currentLength++;
        }
        while (currentLength === tLength) {
            const currentWindowLength = right - left + 1;
            if (currentWindowLength < resultLength) {
                result = s.substring(left, right + 1);
                resultLength = currentWindowLength;
            }
            const leftChar = s[left];
            currentHistogram[leftChar]--;
            if (tHistogram[leftChar] && (currentHistogram[leftChar] < tHistogram[leftChar])) {
                currentLength--;
            }
            left++;
        }
        right++;
    }
    return result;
};