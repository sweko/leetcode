import { Problem } from "../model";

export const problem: Problem<string, string> = {
    name: 'Push Dominoes',
    id: 838,
    url: 'https://leetcode.com/problems/push-dominoes/',
    solution: pushDominoes,
    tests: [
        {
            id: 1,
            argument:  "RR.L",
            result: "RR.L"
        },
        {
            id: 2,
            argument: ".L.R...LR..L..",
            result: "LL.RR.LLRRLL.."
        }
    ]
}

function pushDominoes(dominoes: string): string {
    const start = `L${dominoes}R`;
    const result: string[] = [];
    let index = 1;
    while (index < start.length) {
        while (index < start.length && start[index] !== ".") {
            result.push(start[index]);
            index += 1;
        }
        if (index >= start.length) {
            break;
        }
        const left = index;
        while (start[index] === ".") {
            index += 1;
        }
        const right = index;
        if (start[left - 1] === start[right]) {
            result.push(start[left - 1].repeat(right - left));
        } else if (start[left - 1] === "L" && start[right] === "R") {
            result.push(".".repeat(right - left));
        } else {
            const half = (right - left) / 2;
            result.push("R".repeat(Math.floor(half)));
            if (half % 1 !== 0) {
                result.push(".");
            }
            result.push("L".repeat(Math.floor(half)));
        }
    }
    return result.slice(0, -1).join("");
};