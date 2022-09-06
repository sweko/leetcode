import { Problem } from "../model";

class Node {
    val: number
    children: Node[]
    constructor(val: number) {
        this.val = val;
        this.children = [];
    }
}

function arrayToNodeTree(array: (number | null)[]): Node | null {
    if (array.length === 0) {
        return null;
    }
    const root = new Node(array[0]!);
    const queue = [root];
    let index = 1;
    while (index <= array.length) {
        const node = queue.shift()!;
        index += 1;
        while (array[index] !== null && array[index] !== undefined) {
            const child = new Node(array[index]!);
            queue.push(child);
            node.children.push(child);
            index += 1;
        }
    }
    return root;
}

const wrapParams = (func: (root: Node | null) => number[][]) => (array: (number| null)[]) => {
    const root = arrayToNodeTree(array);
    return func(root);
}

export const problem: Problem<(number | null)[], number[][]> = {
    name: 'N-ary Tree Level Order Traversal',
    id: 429,
    url: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/',
    solution: wrapParams(levelOrder),
    tests: [
        {
            id: 1,
            argument: [1,null,3,2,4,null,5,6],
            result: [[1],[3,2,4],[5,6]]
        },
        {
            id: 2,
            argument: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14],
            result: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
        }
    ]
}

const visitNode = (node: Node| null, level: number, traversal: number[][]):void => {
    if (node === null) {
        return;
    }
    if (!traversal[level]) {
        traversal[level] = [];
    }
    traversal[level].push(node.val);
    for (const child of node.children) {
        visitNode(child, level+1, traversal);
    }
}

function levelOrder(root: Node | null): number[][] {
	const result: number[][] = [];
    visitNode(root, 0, result);
    return result;
};




