import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<string, number> = {
    name: 'Minimum Length of String After Deleting Similar Ends',
    id: 1750,
    url: 'https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends/',
    solution: minimumLength,
    tests: [
        {
            id: 1,
            argument: "ca",
            result: 2
        },
        {
            id: 2,
            argument: "cabaabac",
            result: 0
        },
        {
            id: 3,
            argument: "aabccabba",
            result: 3
        },
        {
            id: 4,
            argument: "a",
            result: 1
        },
        {
            id: 5,
            argument: "aabbccacba",
            result: 1
        },
        {
            id: 6,
            argument: "aa",
            result: 0
        }
    ]
}

function minimumLength(s: string): number {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            break;
        }
        while (s[left] === s[left + 1]) {
            left += 1;
        }
        while (s[right] === s[right - 1]) {
            right -= 1;
        }
        left += 1;
        right -= 1;
    }

    return Math.max(right - left + 1, 0);
};