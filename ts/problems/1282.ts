import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<number[], number[][]> = {
    name: 'Group the People Given the Group Size They Belong To',
    id: 1282,
    url: 'https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to',
    solution: groupThePeople,
    tests: [
        {
            id: 1,
            argument: [3,3,3,3,3,1,3],
            result: [[5],[0,1,2],[3,4,6]]
        },
        {
            id: 2,
            argument: [2,1,3,3,3,2],
            result: [[1],[0,5],[2,3,4]]
        },
        {
            id: 3,
            argument: [2,2,1,1,1,1,1,1],
            result: [[2],[3],[4],[5],[6],[7],[0,1]]
        }
    ]
}

function groupThePeople(groupSizes: number[]): number[][] {
    const groupMap: Record<number, number[]> = {};
    for (let index = 0; index < groupSizes.length; index++) {
        const element = groupSizes[index];
        if (groupMap[element] === undefined) {
            groupMap[element] = [index];
        } else {
            groupMap[element].push(index);
        }
    }

    const groups: number[][] = [];
    for (const size of Object.keys(groupMap)) {
        const groupSize = Number(size);
        const group = groupMap[groupSize];
        while (group.length > 0) {
            groups.push(group.splice(0, groupSize));
        }
    }
    return groups;
};