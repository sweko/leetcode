import { Problem } from "../model";

export const problem: Problem<string, number> = {
    name: 'First Unique Character in a String',
    id: 387,
    url: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
    solution: firstUniqChar,
    tests: [
        {
            id: 1,
            argument: "leetcode",
            result: 0
        },
        {
            id: 2,
            argument: "loveleetcode",
            result: 2
        },
        {
            id: 3,
            argument: "aabb",
            result: -1
        }
    ]
}

function firstUniqChar(s: string): number {
    const result: {index:number, char: string}[] = [];
    const set = new Set<string>();
    const removed = new Set<string>();
    for (let index = 0; index < s.length; index++) {
        const char = s[index];
        if (set.has(char)) {
            if (!removed.has(char)) {
                const rindex = result.findIndex(item => item.char === char);
                result.splice(rindex, 1);
                removed.add(char);
            }
        } else {
            set.add(char);
            result.push({index, char});
        }
    }
    if (result.length) {
        return result[0].index;
    }
    return -1;
};

function firstUniqCharOne(s: string): number {
    const hist: Record<string, { index: number, count: number }> = {};
    for (let index = 0; index < s.length; index++) {
        const char = s[index];
        if (hist[char]) {
            hist[char].count += 1;
        } else {
            hist[char] = {
                count: 1,
                index
            }
        }
    }
    const singles = Object.keys(hist).filter(h => hist[h].count === 1).map(h => hist[h]);
    let result = Number.POSITIVE_INFINITY;
    for (const single of singles) {
        if (single.index < result) {
            result = single.index;
        }
    }

    if (result !== Number.POSITIVE_INFINITY) {
        return result;
    }
    return -1;
};