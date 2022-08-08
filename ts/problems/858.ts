import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number, number], number> = {
    name: 'Mirror Reflection',
    id: 858,
    url: 'https://leetcode.com/problems/mirror-reflection/',
    solution: paramWrapper(mirrorReflection),
    tests: [
        {
            id: 1,
            argument: [2, 1],
            result: 2
        },
        {
            id: 2,
            argument: [3, 1],
            result: 1
        }
    ]
}

interface Ray {
    side: "left" | "right" | "top" | "bottom";
    position: number;
}

function mirrorReflection(p: number, q: number): number {
    let ray: Ray = {
        side: "left",
        position: 0
    };

    
};
