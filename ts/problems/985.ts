import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], [number, number][]], number[]> = {
    name: 'Sum of Even Numbers After Queries',
    id: 985,
    url: 'https://leetcode.com/problems/sum-of-even-numbers-after-queries/',
    solution: paramWrapper(sumEvenAfterQueries),
    tests: [
        {
            id: 1,
            argument: [[1,2,3,4],[[1,0],[-3,1],[-4,0],[2,3]]],
            result: [8,6,2,4]
        },
        {
            id: 2,
            argument: [[1], [[4,0]]],
            result: [0]
        }
    ]
}

function sumEvenAfterQueries(nums: number[], queries: [number, number][]): number[] {
    const numberData = nums.map((number, index) => ({index, isEven: number % 2 === 0}))
    const evens = new Set(numberData
        .filter(data => data.isEven)
        .map(data => data.index));
    let sum = [...evens].reduce((acc, index) => acc + nums[index], 0);

    const processQuery = ([value, index]: [number, number]) => {
        const isCurrentEven = evens.has(index);
        const isValueEven = value % 2 === 0;
        if (isCurrentEven) {
            if (isValueEven) {
                // even to even
                // no change, no need to update evens
                sum += value;
            } else {
                // even to odd
                sum -= nums[index];
                evens.delete(index);
            }
        } else {
            if (isValueEven) {
                // odd to odd
                // no change, no need to update evens
            } else {
                // odd to even
                sum += nums[index] + value;
                evens.add(index);
            }
        }
        nums[index] += value;
        return sum;
    }

    return queries.map(processQuery);
};