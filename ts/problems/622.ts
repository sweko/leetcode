import { Problem } from "../model";


type CallName = keyof MyCircularQueue | "MyCircularQueue";

const testRunner = ({calls, params}: {calls: CallName[], params: [number?][]}) => {
    if (calls[0] !== "MyCircularQueue") {
        throw new Error("First call must be MyCircularQueue");
    }
    const queue = new MyCircularQueue(params[0][0]!);
    const results: (number|boolean|null)[] = [null];
    for (let i = 1; i < calls.length; i++) {
        const call = calls[i];
        if (call === "MyCircularQueue") {
            throw new Error("Only one MyCircularQueue call allowed");
        }
        if (call === "enQueue") {
            results.push(queue.enQueue(params[i][0]!));
        } else {
            results.push(queue[call]());
        }
    }
    return results;
}


export const problem: Problem<{calls: ((keyof MyCircularQueue)|"MyCircularQueue")[], params: [number?][]}, (number|boolean|null)[]> = {
    name: 'Design Circular Queue',
    id: 622,
    url: 'https://leetcode.com/problems/design-circular-queue/',
    solution: testRunner,
    tests: [
        {
            id: 1,
            argument: {
                calls: ["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"],
                params: [[3], [1], [2], [3], [4], [], [], [], [4], []]

            },
            result: [null, true, true, true, false, 3, true, true, true, 4]
        },
        {
            id: 2,
            argument: {
                calls: ["MyCircularQueue","enQueue","Rear","Front","deQueue","Front","deQueue","Front","enQueue","enQueue","enQueue","enQueue"],
                params: [[3],[2],[],[],[],[],[],[],[4],[2],[2],[3]]
            },
            result: [null,true,2,2,true,-1,false,-1,true,true,true,false]
        }
    ]
}


class MyCircularQueue {

    private array: number[];
    private frontIndex = 0;
    private rearIndex = -1;
    private count = 0;

    constructor(k: number) {
        this.array = new Array(k);
    }

    enQueue(value: number): boolean {
        if (this.isFull()) {
            return false;
        }
        this.rearIndex += 1;
        if (this.rearIndex === this.array.length) {
            this.rearIndex = 0;
        }
        this.array[this.rearIndex] = value;
        this.count += 1;
        return true;
    }

    deQueue(): boolean {
        if (this.isEmpty()) {
            return false;
        }
        this.frontIndex += 1;
        if (this.frontIndex === this.array.length) {
            this.frontIndex = 0;
        }
        this.count -= 1;
        return true;
    }

    Front(): number {
        return this.isEmpty() ? -1 : this.array[this.frontIndex];
    }

    Rear(): number {
        return this.isEmpty() ? -1 : this.array[this.rearIndex];
    }

    isEmpty(): boolean {
       return this.count === 0;
    }

    isFull(): boolean {
        return this.count === this.array.length;
    }
}
