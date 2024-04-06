import { arrayToList, ListNode, listToArray } from "../list-utils";
import { Problem } from "../model";

const wrapper = (func: (root: ListNode | null) => ListNode | null) => {
    return (nodeArray: number[]) => {
        const list = arrayToList(nodeArray);
        const result = func(list);
        return listToArray(result);
    }
}

export const problem: Problem<number[], number[]> = {
    name: 'Remove Zero Sum Consecutive Nodes from Linked List',
    id: 1171,
    url: 'https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list',
    solution: wrapper(removeZeroSumSublists),
    tests: [
        {
            id: 1,
            argument: [1, 2, -3, 3, 1],
            result: [3, 1]
        },
        {
            id: 2,
            argument: [1, 2, 3, -3, 4],
            result: [1, 2, 4]
        },
        {
            id: 3,
            argument: [1, 2, 3, -3, -2],
            result: [1]
        },
        {
            id: 4,
            argument: [0],
            result: []
        }
    ]
}

function removeZeroSumSublists(head: ListNode | null): ListNode | null {
    const arrayToList = (array: number[]): ListNode | null => {
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
    }

    const listToArray = (list: ListNode | null): number[] => {
        if (list === null) {
            return [];
        }
        const result: number[] = [];
        let current: ListNode | null = list;
        while (current !== null) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }

    if (head === null) {
        return null;
    }

    // we're going to convert the list to an array, inneficient but easier to work with
    const array = listToArray(head);

    // starting from the first element, we're going to sum the elements until we find a zero sum, or run out of elements
    for (let findex = 0; findex < array.length; findex++) {
        const element = array[findex];
        if (element === 0) {
            // remove 0 elements and restart
            array.splice(findex, 1);
            findex = -1;
            continue;
        }
        let sum = element;
        for (let bindex = findex + 1; bindex < array.length; bindex++) {
            sum += array[bindex];
            if (sum === 0) {
                // we found a zero sum, we're going to remove the elements from the list
                array.splice(findex, bindex - findex + 1);
                // we're going to start again from the first element
                findex = -1;
                break;
            }
        }
    }

    return arrayToList(array);
};