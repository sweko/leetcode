import { Problem } from "../model";

export const problem: Problem<string, number> = {
    name: 'Prefix and Suffix Search',
    id: 745,
    url: 'https://leetcode.com/problems/prefix-and-suffix-search/',
    solution: minPartitions,
    tests: [
        {
            id: 1,
            argument: "32",
            result: 3
        },
        {
            id: 2,
            argument: "82734",
            result: 8,
        },
        {
            id: 3,
            argument: "27346209830709182346",
            result: 9
        }
    ]
}

function minPartitions(n: string): number {
    let max = 0;
    let index = 0;
    while (index < n.length) {
        const current = parseInt(n[index]);
        if (current > max) {
            max = current;
        }
        if (max === 9) {
            return max;
        }
        index += 1;
    }
    return max;
};