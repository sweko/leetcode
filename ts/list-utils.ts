export class ListNode {
     val: number
     next: ListNode | null
     constructor(val?: number, next?: ListNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
}

export const arrayToList = (array: number[]): ListNode | null => {
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

export const listToArray = (list: ListNode | null): number[] => {
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

export const wrapList = <T>(func: (root: ListNode | null) => T) => {
    return (nodeArray: number[]) => {
        const list = arrayToList(nodeArray);
        return func(list);
    }
}