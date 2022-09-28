import { arrayToList, ListNode, listToArray } from "../list-utils";
import { Problem } from "../model";

const wrapper = (func: (root: ListNode | null, n: number) => ListNode | null) => {
    return ([nodeArray, n]: [number[], number]) => {
        const list = arrayToList(nodeArray);
        const result = func(list, n);
        return listToArray(result);
    }
}

export const problem: Problem<[number[], number], number[]> = {
    name: 'Remove Nth Node From End of List',
    id: 19,
    url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    solution: wrapper(removeNthFromEnd),
    tests: [
        {
            id: 1,
            argument: [[1, 2, 3, 4, 5], 2],
            result: [1, 2, 3, 5]
        },
        {
            id: 2,
            argument: [[1], 1],
            result: []
        },
        {
            id: 3,
            argument: [[1, 2], 1],
            result: [1]
        }
    ]
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let fore = head;
    for (let index = 0; index < n; index++) {
        if (fore !== null) {
            fore = fore.next;
        }
    }
    let back = head;
    if (fore === null){
        return head?.next || null;
    }
    while (fore!.next !== null) {
        fore = fore!.next;
        back = back!.next;
    }
    back!.next = back!.next!.next;
    return head;
};