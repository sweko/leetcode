import { get } from "http";
import { readOutputJson, readTestCase } from "../file-utils";
import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<number[], boolean> = {
    name: 'Greatest Common Divisor Traversal',
    id: 2709,
    url: 'https://leetcode.com/problems/greatest-common-divisor-traversal',
    solution: canTraverseAllPairs,
    tests: [
        {
            id: 1,
            argument: [2, 3, 6],
            result: true
        },
        {
            id: 2,
            argument: [3, 9, 5],
            result: false
        },
        {
            id: 3,
            argument: [4, 3, 12, 8],
            result: true
        },
        {
            id: 4,
            argument: [10007,20014,30021],
            result: true
        },
        {
            id: 5,
            argument: readTestCase(2709, 5, testCaseProcessor),
            result: true
        }
    ]
}

function testCaseProcessor(input: string): number[] {
    const result = JSON.parse(input);
    return result;
}

function getPrimes(limit: number): number[] {
    const primes = [2];
    const sieve = Array(limit).fill(true).map((_, index) => index % 2 !== 0);
    for (let i = 3; i < limit; i += 2) {
        if (sieve[i]) {
            primes.push(i);
            for (let j = i * i; j < limit; j += i) {
                sieve[j] = false;
            }
        }
    }
    return primes;
}


function canTraverseAllPairs(nums: number[]): boolean {
    // is there a 1, if there is, we fail immediately
    if (nums.includes(1)) {
        return nums.length === 1;
    }

    const primes = getPrimes(100_000);
    const primeMap = new Map<number, number[]>();
    const numsMap = new Map<number, number[]>();

    for (const num of nums) {
        if (numsMap.has(num)) {
            continue;
        }
        let currentNum = num;
        for (const prime of primes) {
            if (currentNum % prime === 0) {
                if (!primeMap.has(prime)) {
                    primeMap.set(prime, [num]);
                } else {
                    primeMap.get(prime)!.push(num);
                }
                if (!numsMap.has(num)) {
                    numsMap.set(num, [prime]);
                } else {
                    numsMap.get(num)!.push(prime);
                }
                while(currentNum % prime === 0) {
                    currentNum /= prime;
                }
                if (currentNum === 1) {
                    break;
                }
            }
        }
    }

    console.log("primeMap:",primeMap);
    console.log("numsMap:", numsMap);

    const aprime = primeMap.keys().next().value;

    const queue = [...primeMap.get(aprime)!];
    primeMap.delete(aprime);
    while (queue.length) {
        const current = queue.shift()!;
        const currentPrimes = numsMap.get(current)!;
        for (const prime of currentPrimes) {
            if (!primeMap.has(prime)) {
                continue;
            }
            const numbers = primeMap.get(prime)!;
            for (const number of numbers) {
                if (number === current) {
                    continue;
                }
                queue.push(number);
            }
            primeMap.delete(prime);
        }
    }

    return primeMap.size === 0;
};