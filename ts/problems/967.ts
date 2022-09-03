import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number, number], number[]> = {
    name: 'Numbers With Same Consecutive Differences',
    id: 967,
    url: 'https://leetcode.com/problems/numbers-with-same-consecutive-differences/',
    solution: paramWrapper(numsSameConsecDiff),
    tests: [
        {
            id: 1,
            argument: [3, 7],
            result: [181, 292, 707, 818, 929]
        },
        {
            id: 2,
            argument: [2, 1],
            result: [10, 12, 21, 23, 32, 34, 43, 45, 54, 56, 65, 67, 76, 78, 87, 89, 98]
        },
        {
            id: 3,
            argument: [2, 0],
            result: [11, 22, 33, 44, 55, 66, 77, 88, 99]
        },
        {
            id: 4,
            argument: [9, 0],
            result: [111111111, 222222222, 333333333, 444444444, 555555555, 666666666, 777777777, 888888888, 999999999]
        }
    ]
}

function numsSameConsecDiff(n: number, k: number): number[] {
    if (n === 0) {
        return [];
    }
    const init = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return init
        .flatMap(digit => getNumbers(digit, n, k))
        .map(digits => Number(digits.join("")));
};

const getNumbers = (digit: number, length: number, diff: number) => {
    let active = 1;
    let values = [[digit]];
    while (active < length) {
        values = values.flatMap(value => getNexts(value, length, diff));
        active += 1;
    }
    return values;
}

const getNexts = (current: number[], length: number, diff: number) => {
    if (current.length === length) {
        return [current];
    }
    const last = current[current.length - 1];
    if (diff === 0) {
        return [[...current, last]];
    }
    const result: number[][] = [];
    if (last - diff >= 0) {
        result.push([...current, last - diff]);
    }
    if (last + diff < 10) {
        result.push([...current, last + diff]);
    }
    return result;
}