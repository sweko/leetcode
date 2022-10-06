import { readTestCase } from "../file-utils";
import { Problem } from "../model";


type CallName = keyof TimeMap | "TimeMap";

const testRunner = ({calls, params}: {calls: CallName[], params: ([] | [string, string, number]|[string, number])[]}) => {
    if (calls[0] !== "TimeMap") {
        throw new Error("First call must be TimeMap");
    }
    const queue = new TimeMap();
    const results: (string|null)[] = [null];
    for (let i = 1; i < calls.length; i++) {
        const call = calls[i];
        if (call === "TimeMap") {
            throw new Error("Only one TimeMap call allowed");
        }
        if (call === "set") {
            const [key, value, timestamp] = params[i];
            queue.set(key!, value! as string, timestamp!);
            results.push(null);
        } else {
            const [key, timestamp] = params[i];
            const result = queue.get(key!, timestamp! as number);
            results.push(result);
        }
    }
    return results;
}


export const problem: Problem<{calls: ((keyof TimeMap)|"TimeMap")[], params: ([] | [string, string, number]|[string, number])[]}, (string|null)[]> = {
    name: 'Design Circular Queue',
    id: 622,
    url: 'https://leetcode.com/problems/design-circular-queue/',
    solution: testRunner,
    tests: [
        {
            id: 1,
            argument: {
                calls: ["TimeMap", "set", "get", "get", "set", "get", "get"],
                params: [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]

            },
            result: [null, null, "bar", "bar", null, "bar2", "bar2"]
        },
        {
            id: 2,
            argument: {
                calls: readTestCase(981, "2.calls", data => JSON.parse(data)),
                params: readTestCase(981, "2.params", data => JSON.parse(data))
            },
            result: []
        }
    ]
}


class TimeMap {
    private data: Record<string, {timestamp: number, value: string}[]> = {};

    constructor() {

    }

    set(key: string, value: string, timestamp: number): void {
        if (this.data[key]) {
            this.data[key].push({timestamp, value});
            //this.data[key].sort((a, b) => a.timestamp - b.timestamp);
        }
        else {
            this.data[key] = [{timestamp, value}];
        }
    }

    get(key: string, timestamp: number): string {
        if (!this.data[key]) {
            return "";
        }
        const data = this.data[key];
        let index = 0;
        if (data[0].timestamp > timestamp) {
            return "";
        }
        while (index < data.length && data[index].timestamp <= timestamp) {
            index++;
        }
        return data[index - 1].value;
    }
}