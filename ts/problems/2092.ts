import { readOutputJson, readTestCase } from "../file-utils";
import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number, [number, number, number][], number], number[]> = {
    name: 'Find All People With Secret',
    id: 2092,
    url: 'https://leetcode.com/problems/find-all-people-with-secret',
    solution: paramWrapper(findAllPeople),
    tests: [
        {
            id: 1,
            argument: [6, [[1, 2, 5], [2, 3, 8], [1, 5, 10]], 1],
            result: [0, 1, 2, 3, 5]
        },
        {
            id: 2,
            argument: [4, [[3, 1, 3], [1, 2, 2], [0, 3, 3]], 3],
            result: [0, 1, 3]
        },
        {
            id: 3,
            argument: [5, [[3, 4, 2], [1, 2, 1], [2, 3, 1]], 1],
            result: [0, 1, 2, 3, 4]
        },
        {
            id: 4,
            argument: readTestCase(2092, 4, testCaseProcessor),
            result: readOutputJson(2092, 4)
        },
        {
            id: 5,
            argument: readTestCase(2092, 5, testCaseProcessor),
            result: readOutputJson(2092, 5)
        },
        {
            id: 6,
            argument: readTestCase(2092, 6, testCaseProcessor),
            result: readOutputJson(2092, 6)
        },

    ]
}


function testCaseProcessor(input: string): [number, [number, number, number][], number] {
    const words = input.split("\r\n");
    const people = parseInt(words[0]);
    const meetings = JSON.parse(words[1]);
    const first = parseInt(words[2]);
    return [people, meetings, first];
}

function findAllPeopleSlow(n: number, meetings: number[][], firstPerson: number): number[] {
    const inTheKnow = new Set([0, firstPerson]);
    meetings.sort((a, b) => a[2] - b[2]);

    while (meetings.length !== 0) {
        const batch = [meetings.shift()!];
        while (meetings.length && meetings[0][2] === batch[0][2]) {
            batch.push(meetings.shift()!);
        }
        let changed = false;
        do {
            changed = false;
            for (const [a, b, _] of batch) {
                if (inTheKnow.has(a) && inTheKnow.has(b)) {
                    continue;
                }
                if (inTheKnow.has(a)) {
                    inTheKnow.add(b);
                    changed = true;
                }
                if (inTheKnow.has(b)) {
                    inTheKnow.add(a);
                    changed = true;
                }
            }
        } while (changed);
    }

    return Array.from(inTheKnow).sort((a, b) => a - b);
};

function findAllPeople(n: number, meetings: number[][], firstPerson: number): number[] {
    const inTheKnow = new Set([0, firstPerson]);
    meetings.sort((a, b) => a[2] - b[2]);
    let index = 0;

    while (meetings.length > index) {
        const batch = [meetings[index]];
        index += 1;
        while (meetings.length > index && meetings[index][2] === batch[0][2]) {
            batch.push(meetings[index]);
            index += 1;
        }
        if (batch.length === 1) {
            const [a, b, _] = batch[0];
            if (inTheKnow.has(a)) {
                inTheKnow.add(b);
            }
            if (inTheKnow.has(b)) {
                inTheKnow.add(a);
            }
            continue;
        }
        const people = Array(n).fill(false).map(_ => [] as number[]);
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        for (const meeting of batch) {
            const [a, b, _] = meeting;
            people[a].push(b);
            people[b].push(a);
            min = Math.min(min, a, b);
            max = Math.max(max, a, b);
        }
        for (let i = min; i <= max; i++) {
            if (people[i].length === 0) {
                continue;
            }
            if (!inTheKnow.has(i)) {
                continue;
            }
            const queue = [i];
            while (queue.length !== 0) {
                const current = queue.shift()!;
                for (const other of people[current]) {
                    people[other] = people[other].filter(p => p !== current);
                    if (!inTheKnow.has(other)) {
                        inTheKnow.add(other);
                        if (people[other].length !== 0) {
                            queue.push(other);
                        }
                    }
                }
            }
        }
    }

    return Array.from(inTheKnow).sort((a, b) => a - b);
};