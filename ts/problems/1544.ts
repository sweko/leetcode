import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<string, string> = {
    name: 'Make The String Great',
    id: 1544,
    url: 'https://leetcode.com/problems/make-the-string-great/',
    solution: makeGood,
    tests: [
        {
            id: 1,
            argument: "leEeetcode",
            result: "leetcode"
        },
        {
            id: 2,
            argument: "abBAcC",
            result: ""
        },
        {
            id: 3,
            argument: "s",
            result: "s"
        },
        {
            id: 4,
            argument: "Pp",
            result: ""
        },
        {
            id: 5,
            argument: "aABba",
            result: "a"
        },
        {
            id: 6,
            argument: "aABbc",
            result: "c"
        }
    ]
}

function makeGood(input: string): string {
    const diff = 32; // the difference between the ASCII code of the upper and lower case letters
    let index = 0;
    const stack: string[] = [];

    while (index < input.length) {
        if (stack.length === 0) {
            stack.push(input[index]);
            index += 1;
            continue;
        }
        const currentChar = input[index];
        const topChar = stack[stack.length - 1];
        const charDiff = Math.abs(currentChar.charCodeAt(0) - topChar.charCodeAt(0));
        if (charDiff === diff) {
            index += 1;
            stack.pop();
        } else {
            index += 1;
            stack.push(currentChar);
        }
    }

    return stack.join('');
};