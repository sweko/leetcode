import { Problem } from "../model";

export const problem: Problem<number, number> = {
    name: 'Count Vowels Permutation',
    id: 1220,
    url: 'https://leetcode.com/problems/count-vowels-permutation/',
    solution: countVowelPermutation,
    tests: [
        {
            id: 1,
            argument: 1,
            result: 5
        },
        {
            id: 2,
            argument: 2,
            result: 10
        },
        {
            id: 3,
            argument: 5,
            result: 68
        },
        {
            id: 4,
            argument: 1000,
            result: 89945857
        },
        {
            id: 5,
            argument: 20000,
            result: 759959057
        }
    ]
}

type Vowel = 'a' | 'e' | 'i' | 'o' | 'u';

const memo: { [key: string]: Record<number, number> } = {
    'a': { 1: 1 },
    'e': { 1: 1 },
    'i': { 1: 1 },
    'o': { 1: 1 },
    'u': { 1: 1 }
}
const mod = 10**9+7;

function countLetter(letter: Vowel, length: number): number {
    if (memo[letter][length]) {
        return memo[letter][length]
    };
    if (letter === 'a') {
        const result = countLetter('e', length - 1) % mod;
        memo['a'][length] = result;
        return result;
    }
    if (letter === 'e') {
        const result = (countLetter('a', length - 1) + countLetter('i', length - 1)) % mod;
        memo['e'][length] = result;
        return result;
    }
    if (letter === 'i') {
        const result = (countLetter('a', length - 1) + countLetter('e', length - 1) + countLetter('o', length - 1) + countLetter('u', length - 1)) % mod;
        memo['i'][length] = result;
        return result;
    }
    if (letter === 'o') {
        const result = (countLetter('i', length - 1) + countLetter('u', length - 1)) % mod;
        memo['o'][length] = result;
        return result;
    }
    if (letter === 'u') {
        const result = countLetter('a', length - 1) % mod;
        memo['u'][length] = result;
        return result;
    }
    throw new Error(`Invalid letter ${letter}`);
}

function countVowelPermutation(n: number): number {
    return (countLetter("a", n)
        + countLetter("e", n)
        + countLetter("i", n)
        + countLetter("o", n)
        + countLetter("u", n)) % mod;
};