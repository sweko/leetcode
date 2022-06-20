import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[string[], string], string[][]> = {
    name: 'Binary Tree Cameras',
    id: 968,
    url: 'https://leetcode.com/problems/binary-tree-cameras/',
    solution: paramWrapper(suggestedProducts),
    tests: [
        {
            id: 1,
            argument: [["mobile","mouse","moneypot","monitor","mousepad"], "mouse"],
            result: [
                ["mobile","moneypot","monitor"],
                ["mobile","moneypot","monitor"],
                ["mouse","mousepad"],
                ["mouse","mousepad"],
                ["mouse","mousepad"]
            ]
        },
        {
            id: 2,
            argument: [["havana"], "havana"],
            result: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
        },
        {
            id: 3,
            argument: [["bags","baggage","banner","box","cloths"], "bags"],
            result:  [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]
        }
    ]
}

function suggestedProducts(products: string[], searchWord: string): string[][] {
    // full brute force
    const data = products.slice().sort((f, s) => f.localeCompare(s));
    const result: string[][] = [];
    for (let index = 0; index < searchWord.length; index++) {
        const prefix = searchWord.substring(0, index + 1);
        const suggestion = data.filter(p => p.startsWith(prefix)).slice(0, 3);
        result.push(suggestion);
    }
    return result;
};
