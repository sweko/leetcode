import { ClassArgument, Problem } from "../model";
import { classWrapper } from "../utils";

class WordFilter {
    constructor(words: string[]) {
        console.log(words);
    }

    f(prefix: string, suffix: string): number {
        console.log(prefix);
        console.log(suffix);
        return 0;
    }
}


export const problem: Problem<ClassArgument<string[], [string, string]>, number[]> = {
    name: 'Prefix and Suffix Search',
    id: 745,
    url: 'https://leetcode.com/problems/prefix-and-suffix-search/',
    solution: classWrapper(WordFilter, "f"),
    tests: [
        {
            id: 1,
            argument: {
                initialization: ['apple'],
                calls: [['a', 'e']]
            },
            result: [0]
        }
    ]
}