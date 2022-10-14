import { ListNode, listToArray, wrapList } from "../list-utils";
import { Problem } from "../model";

const wrapper = (nodeArray: number[]) => {
    const result = wrapList(deleteMiddle)(nodeArray);
    return listToArray(result);
};

export const problem: Problem<number[], number[]> = {
    name: 'Find Original Array From Doubled Array',
    id: 2007,
    url: 'https://leetcode.com/problems/find-original-array-from-doubled-array/',
    solution: wrapper,
    tests: [
        {
            id: 1,
            argument: [1,3,4,7,1,2,6],
            result: [1,3,4,1,2,6]
        },
        {
            id: 2,
            argument: [1,2,3,4],
            result: [1,2,4]
        },
        {
            id: 3,
            argument: [2,1],
            result: [2]
        }
    ]
}

function deleteMiddle(head: ListNode | null): ListNode | null {
    // wrong-way round solution :)
    if (head === null) {
        return null;
    }
    const array = [];
    while (head !== null) {
        array.push(head.val);
        head = head.next;
    };
    const middle = Math.floor(array.length / 2);
    array.splice(middle, 1);
    if (array.length === 0) {
        return null;
    }
    const root = new ListNode(array[0]);
    let current = root;
    for (let index = 1; index < array.length; index++) {
        const element = array[index];
        current.next = new ListNode(element);
        current = current.next;
    }
    return root;
};