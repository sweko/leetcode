import { Problem } from "../model";

export const problem: Problem<string[], boolean> = {
    name: 'Satisfiability of Equality Equations',
    id: 990,
    url: 'https://leetcode.com/problems/satisfiability-of-equality-equations/',
    solution: equationsPossible,
    tests: [
        {
            id: 1,
            argument:  ["a==b","b!=a"],
            result: false
        },
        {
            id: 2,
            argument: ["b==a","a==b"],
            result: true
        },
        {
            id: 3,
            argument: ["a!=a"],
            result: false
        }
    ]
}

interface Equation {
    variables: [string, string];
    equality: boolean;
}

function parseEquation(equation: string): Equation {
    const [left, sign, _,  right] = equation.split("");

    return {
        variables: [left, right],
        equality: sign === "="
    }
}

function equationsPossible(equations: string[]): boolean {
    const parsedEquations = equations.map(parseEquation);
    const xdict = parsedEquations.some(eq => !eq.equality && (eq.variables[0] === eq.variables[1]));
    if (xdict) {
        return false;
    }

    const equivs = parsedEquations
        .filter(e => e.variables[0] !== e.variables[1])
        .filter(e => e.equality)
        .map(e => e.variables);
    const groups: string[][] =[];
    while (equivs.length > 0) {
        const [left, right] = equivs.pop()!;
        const queue = [left, right];
        const group: string[] = [left, right];
        while (queue.length !== 0) {
            const variable = queue.pop()!;
            let index = 0;
            while (index < equivs.length) {
                const equiv = equivs[index];
                if (equiv[0] === variable) {
                    if (group.indexOf(equiv[1]) === -1) {
                        queue.push(equiv[1]);
                        group.push(equiv[1]);
                    }
                    equivs.splice(index, 1);
                }
                else if (equiv[1] === variable) {
                    if (group.indexOf(equiv[0]) === -1) {
                        queue.push(equiv[0]);
                        group.push(equiv[0]);
                    }
                    equivs.splice(index, 1);
                } else {
                    index+=1;
                }
            }
        }
        groups.push(group);
    }
    const ineqs = parsedEquations.filter(e => !e.equality);
    for (const ineq of ineqs) {
        const [left, right] = ineq.variables;
        for (const group of groups) {
            if (group.indexOf(left) !== -1 && group.indexOf(right) !== -1) {
                return false;
            }
        }
    }
    return true;
};