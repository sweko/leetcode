import { arrayToList, ListNode, listToArray } from "../list-utils";
import { Problem } from "../model";

const wrapper = (func: (root: ListNode | null, n: number) => (ListNode | null)[]) => {
    return ([nodeArray, n]: [number[], number]) => {
        const list = arrayToList(nodeArray);
        const result = func(list, n);
        return result.map(listToArray);
    }
}

export const problem: Problem<[number[], number], number[][]> = {
    name: 'Split Linked List in Parts',
    id: 725,
    url: 'https://leetcode.com/problems/split-linked-list-in-parts/',
    solution: wrapper(splitListToParts),
    tests: [
        {
            id: 1,
            argument: [[1, 2, 3, 4, 5], 2],
            result: [[1, 2, 3], [4, 5]]
        },
        {
            id: 2,
            argument: [[1], 1],
            result: [[1]]
        },
        {
            id: 3,
            argument: [[1, 2], 1],
            result: [[1, 2]] 
        },
        {
            id: 4,
            argument: [[1, 2, 3], 5],
            result: [[1], [2], [3], [], []]
        },
        {
            id: 5,
            argument: [[], 3],
            result: [[], [], []]
        },
        {
            id: 6,
            argument: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3],
            result: [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]
        }
    ]
}

function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
    if (head === null) {
        return Array(k).fill(null).map(() => null);
    };

    let length = 0;
    let node: ListNode | null = head;
    while (node !== null) {
        length++;
        node = node.next;
    }

    const partLength = Math.floor(length / k);
    const remainder = length % k;

    const result: Array<ListNode | null> = [];
    node = head;
    for (let index = 0; index < k; index++) {
        result.push(node);
        const partSize = partLength + (remainder > index ? 1 : 0);
        for (let j = 0; j < partSize - 1; j++) {
            node = node!.next;
        }
        if (node !== null) {
            const next = node.next as any;
            node.next = null;
            node = next;
        }
    }

    return result;
};