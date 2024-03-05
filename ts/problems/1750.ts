import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<string, number> = {
    name: 'Minimum Length of String After Deleting Similar Ends',
    id: 1750,
    url: 'https://leetcode.com/problems/maximum-units-on-a-truck/',
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
        }
    ]
}

function minimumLength(s: string): number {
    return 0;
};