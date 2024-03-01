import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<string, string> = {
    name: 'Maximum Odd Binary Number',
    id: 2864,
    url: 'https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to',
    solution: maximumOddBinaryNumber,
    tests: [
        {
            id: 1,
            argument: "010",
            result: "001"
        },
        {
            id: 2,
            argument: "0101",
            result: "1001"
        },
        {
            id: 3,
            argument: "1",
            result: "1"
        }
    ]
}

function maximumOddBinaryNumber(s: string): string {
    const histogram = {
        ones: -1, // -1 because we put the last one at the end
        zeros: 0
    }
    for (const character of s) {
        if (character === '1') {
            histogram.ones += 1;
        } else {
            histogram.zeros += 1;
        }
    };
    return `${'1'.repeat(histogram.ones)}${'0'.repeat(histogram.zeros)}1`;
};