import { Problem } from "../model";

class Node {
    val: number
    next: Node | null
    random: Node | null
    constructor(val?: number, next?: Node, random?: Node) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.random = (random === undefined ? null : random)
    }
}

type NodeList = [number, number|null][]

const fromNodeList = (nl: NodeList) => {
    const nodes = nl.map(([val, random]) => ({
        node: new Node(val),
        random
    }));
    for (let index = 0; index < nodes.length; index++) {
        const {node, random} = nodes[index];
        node.next = nodes[index+1]?.node ?? null;
        node.random = random !== null ? nodes[random]?.node : null;
    }

    return nodes[0]?.node ?? null;
}

const toNodeList = (node: Node | null) => {
    const head = node;
    const nodeList: NodeList = [];
    const nodes = [];
    while (node) {
        nodeList.push([node.val, null]);
        nodes.push(node);
        node = node.next;
    }
    node = head;
    while (node) {
        if (node.random !== null) {
            nodeList[nodes.indexOf(node)][1] = nodes.indexOf(node.random);
        }
        node = node.next;
    }

    return nodeList;
}



export const problem: Problem<NodeList, NodeList> = {
    name: 'Copy List with Random Pointer',
    id: 138,
    url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
    solution: (nl) => toNodeList(copyRandomList(fromNodeList(nl))),
    tests: [
        {
            id: 1,
            argument: [[7,null],[13,0],[11,4],[10,2],[1,0]],
            result: [[7,null],[13,0],[11,4],[10,2],[1,0]]
        },
        {
            id: 2,
            argument: [[1,1],[2,1]],
            result: [[1,1],[2,1]]
        },
        {
            id: 3,
            argument: [[3,null],[3,0],[3,null]],
            result: [[3,null],[3,0],[3,null]]
        },
        {
            id: 4,
            argument: [],
            result: []
        }
    ]
}

// function copyRandomList(head: Node | null): Node | null {
//     // mimics the copy-via-JSON-serialization mechanism
//     return fromNodeList(toNodeList(head));
// };

function copyRandomList(head: Node | null): Node | null {
    if (head === null) {
        return null;
    }
    let node: Node | null = head;
    while (node) {
        const next: Node | null = node.next;
        node.next = new Node(node.val);
        node.next.next = next;
        node = next;
    }
    node = head;
    while (node) {
        if (node.next !== null) {
            node.next.random = node.random !== null ? node.random.next : null;
            node = node.next.next;
        }
    }
    node = head;
    const copyHead = head.next;
    while (node) {
        if (node.next !== null) {
            const copy = node.next;
            node.next = node.next.next;
            copy.next = copy.next !== null ? copy.next.next : null;
            node = node.next;
        }
    }
    return copyHead;
};