import { Problem } from "../model";

export const problem: Problem<string, number> = {
    name: 'Decode Ways',
    id: 91,
    url: 'https://leetcode.com/problems/decode-ways/',
    solution: numDecodings,
    tests: [
        {
            id: 1,
            argument: "12",
            result: 2
        },
        {
            id: 2,
            argument: "226",
            result: 3
        },
        {
            id: 3,
            argument: "06",
            result: 0
        },
        {
            id: 4,
            argument: "111111111111111111111111111111111111111111111",
            result: 1836311903
        },
    ]
}

const memo: Record<string, number> = {
    "": 1,
};

function numDecodings(s: string): number {
    // port from C# solution
    if (memo[s] !== undefined) {
        return memo[s];
    }
    const first = s[0];
    if (first === '0') {
        memo[s] = 0;
        return 0;
    }
    if (s.length === 1) {
        memo[s] = 1;
        return 1;
    }
    if (first === '1') {
        const result = numDecodings(s.substring(1)) + numDecodings(s.substring(2));
        memo[s] = result;
        return result;
    }
    if (first === '2') {
        var next = s[1];
        let result = numDecodings(s.substring(1));
        if (next <= '6') {
            result += numDecodings(s.substring(2));
        }
        memo[s] = result;
        return result;
    }
    return numDecodings(s.substring(1));
}