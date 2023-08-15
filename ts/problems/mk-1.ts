import { Problem } from "../model";

export const problem: Problem<number, number> = {
    name: 'Министерски маки',
    id: "mk-1",
    url: '-',
    solution: ministerskiMaki,
    tests: [
        {
            id: 1,
            argument: 2,
            result: 3
        },
        {
            id: 2,
            argument: 1,
            result: 1
        },
        {
            id: 3,
            argument: 3,
            result: 16
        },
        {
            id: 4,
            argument: 5,
            result: 1576
        },
        {
            id: 5,
            argument: 4,
            result: 137
        },
        {
            id: 6,
            argument: 6,
            result: 22687
        },
        {
            id: 7,
            argument: 10,
            result: 550180953
        },
    ]
}

function ministerskiMaki(lawCount: number): number {
    const buckets = Array(lawCount).fill(null).map((_, i) => i + 1);

    const results = giveLaw(buckets, lawCount);

    return results;
};

const cache: { [key: string]: number } = {};

function giveLaw(buckets: number[], lawCount: number) : number {
    const key = `${buckets.join(',')}-${lawCount}`;
    if (cache[key]) {
        return cache[key];
    }

    if (lawCount === 0) {
        // is someone happy?
        const happy = buckets.findIndex(b => b === 0) !== -1;
        cache[key] = happy ? 1 : 0;
        return happy ? 1 : 0;
    }

    let result = 0;
    for (let i = 0; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (bucket === 0) {
            continue;
        }
        const newBuckets = [...buckets];
        newBuckets[i] = bucket - 1;
        result += giveLaw(newBuckets, lawCount - 1);
        result %= 1_000_000_007;
    }

    cache[key] = result;
    return result;
}