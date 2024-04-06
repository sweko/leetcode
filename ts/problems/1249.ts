import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<string, string> = {
    name: 'Minimum Remove to Make Valid Parentheses',
    id: 1249,
    url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses',
    solution: minRemoveToMakeValid,
    tests: [
        {
            id: 1,
            argument: "lee(t(c)o)de)",
            result: "lee(t(c)o)de"
        },
        {
            id: 2,
            argument: "a)b(c)d",
            result: "ab(c)d"
        },
        {
            id: 3,
            argument: "))((",
            result: ""
        },
        {
            id: 2,
            argument: "a)b(c)d(",
            result: "ab(c)d"
        },

    ]
}

function minRemoveToMakeValid(s: string): string {
    const input = s.split('');
    const fstack: string[] = [];
    let index = 0;

    let open = 0;
    let close = 0;

    while (index < input.length) {
        const currentChar = input[index];
        if (currentChar !== '(' && currentChar !== ')') {
            fstack.push(currentChar);
            index += 1;
            continue;
        }

        if (currentChar === '(') {
            open += 1;
            fstack.push(currentChar);
            index += 1;
            continue;
        } 

        if (currentChar === ')') {
            if (open > close) {
                close += 1;
                fstack.push(currentChar);
            }
            index += 1;
        }
    }

    const bstack: string[] = [];
    index = fstack.length - 1;
    open = 0;
    close = 0;

    while (index >= 0) {
        const currentChar = fstack[index];
        if (currentChar !== '(' && currentChar !== ')') {
            bstack.push(currentChar);
            index -= 1;
            continue;
        }

        if (currentChar === ')') {
            close += 1;
            bstack.push(currentChar);
            index -= 1;
            continue;
        } 

        if (currentChar === '(') {
            if (close > open) {
                open += 1;
                bstack.push(currentChar);
            }
            index -= 1;
        }
    }

    return bstack.reverse().join('');
};