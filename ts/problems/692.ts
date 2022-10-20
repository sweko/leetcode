import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[string[], number], string[]> = {
    name: 'Top K Frequent Words',
    id: 692,
    url: 'https://leetcode.com/problems/top-k-frequent-words/',
    solution: paramWrapper(topKFrequent),
    tests: [
        {
            id: 1,
            argument: [["i","love","leetcode","i","love","coding"], 2],
            result: ["i","love"]
        },
        {
            id: 2,
            argument: [["the","day","is","sunny","the","the","the","sunny","is","is"], 4],
            result: ["the","is","sunny","day"]
        }
    ]
}

function topKFrequent(words: string[], k: number): string[] {
    const cache = new Map<string, number>();
    for (const word of words) {
        cache.set(word, (cache.get(word) || 0) + 1);
    }
    const sorted = [...cache.entries()].sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    });
    return sorted.slice(0, k).map(([word]) => word);
};
