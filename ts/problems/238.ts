import { readOutputJson, readTestCase } from "../file-utils";
import { Problem } from "../model";

export const problem: Problem<number[], number[]> = {
    name: 'Product of Array Except Self',
    id: 238,
    url: 'https://leetcode.com/problems/product-of-array-except-self/',
    solution: productExceptSelf,
    tests: [
        {
            id: 1,
            argument: [1,2,3,4],
            result: [24,12,8,6]
        },
        {
            id: 2,
            argument: [-1,1,0,-3,3],
            result: [0,0,9,0,0]
        },
        {
            id: 3,
            argument: readTestCase(238, 3, testCaseProcessor),
            result: readOutputJson(238, 3)
        }
    ]
}

function testCaseProcessor(input: string): number[] {
    const numbers = JSON.parse(input);
    return numbers;
}

/**
 * Trivial brute-force implementation (Time-limit exceeded)
 */
function _brute_productExceptSelf(nums: number[]): number[] {
    // trivial brute-force implementation
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        let product = 1;
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                product *= nums[j];
            }
        }
        result.push(product);
    }
    return result;
};

/**
 * Linear solution (amenable to overflow)
 */
function productExceptSelf(nums: number[]): number[] {
    // special case: there is a zero
    const zeroIndex = nums.indexOf(0);
    if (zeroIndex >= 0) {
        // special special case: there are two or more zeros, the result is all zeros
        if (nums.indexOf(0, zeroIndex + 1) >= 0) {
            return nums.map(_ => 0);
        }

        // there is only one zero, the result is all zeros except for the zero
        const product = nums.reduce((acc, n) => n === 0 ? acc : acc * n, 1);
        return nums.map(n => n === 0 ? product : 0);
    }

    const product = nums.reduce((acc, n) => acc * n, 1);
    return nums.map(n => product / n);
};