import { readOutputJson, readTestCase } from "../file-utils";
import { Problem } from "../model";

export const problem: Problem<string[], number[][]> = {
    name: 'Palindrome Pairs',
    id: 336,
    url: 'https://leetcode.com/problems/palindrome-pairs/',
    solution: palindromePairs,
    tests: [
        {
            id: 1,
            argument: ["abcd","dcba","lls","s","sssll"],
            result: [[0,1],[1,0],[2,4], [3,2]]
        },
        {
            id: 2,
            argument: ["bat","tab","cat"],
            result:  [[0,1],[1,0]]
        },
        {
            id: 3,
            argument: ["a",""],
            result: [[0,1],[1,0]]
        },
        {
            id: 4,
            argument: readTestCase(336, 4, testCaseProcessor),
            result: readOutputJson(336, 4)
        },
        {
            id: 5,
            argument: readTestCase(336, 5, testCaseProcessor),
            result: [[26,676],[52,1352],[78,2028],[104,2704],[130,3380],[156,4056],[182,4732],[676,26],[728,1378],[754,2054],[780,2730],[806,3406],[832,4082],[858,4758],[1352,52],[1378,728],[1430,2080],[1456,2756],[1482,3432],[1508,4108],[1534,4784],[2028,78],[2054,754],[2080,1430],[2132,2782],[2158,3458],[2184,4134],[2210,4810],[2704,104],[2730,780],[2756,1456],[2782,2132],[2834,3484],[2860,4160],[2886,4836],[3380,130],[3406,806],[3432,1482],[3458,2158],[3484,2834],[3536,4186],[3562,4862],[4056,156],[4082,832],[4108,1508],[4134,2184],[4160,2860],[4186,3536],[4238,4888],[4732,182],[4758,858],[4784,1534],[4810,2210],[4836,2886],[4862,3562],[4888,4238]]
        }
    ]
}

function testCaseProcessor(input: string):string[] {
    const words = input.split(",").map(word => word.slice(1, -1));
    return words;
}

type Histogram = number[];

interface WordHist {
    word: string,
    histogram: Histogram;
}

const compareHistograms = (first: Histogram, second: Histogram) => {
    for (let index = 0; index < first.length; index++) {
        if (first[index] !== second[index]) {
            return false;
        }
    }
    return true;
}

const makeHistogram = (word: string):Histogram => {
    const result: Histogram = Array(26).fill(0);
    for (const char of word) {
        const index = char.charCodeAt(0)-97;
        result[index] += 1;
    }
    return result;
}

function palindromePairs(words: string[]): number[][] {
    const result = [];
    const hists = words.map(word => ({word, histogram: makeHistogram(word)}));
    for (let i = 0; i < words.length; i++)
    {
        for (let j = 0; j < words.length; j++)
        {
            if (i === j)
            {
                continue;
            }

            if (isPalindrome(hists[i], hists[j]))
            {
                result.push([i, j]);
            }
        }
    }
    return result;
}

function isPalindrome(first: WordHist, second: WordHist)
{
    if (first.word.length === second.word.length)
    {
        if (!compareHistograms(first.histogram, second.histogram)){
            return false;
        }
        var l = first.word.length;
        for (let i = 0; i < l; i++)
        {
            if (first.word[i] !== second.word[l-i-1])
            {
                return false;
            }
        }
        return true;
    }
    else if (first.word.length > second.word.length)
    {
        var sl = second.word.length;
        var fl = first.word.length;
        for (let i = 0; i < sl; i++)
        {
            if (first.word[i] !== second.word[sl - i - 1])
            {
                return false;
            }
        }

        for (let i = sl; i < first.word.length; i++)
        {
            if (first.word[i] !== first.word[fl-i+sl-1])
            {
                return false;
            }
        }
        return true;
    }
    else
    {
        var fl = first.word.length;
        var sl = second.word.length;
        for (let i = 0; i < fl; i++)
        {
            if (first.word[i] !== second.word[sl - i - 1])
            {
                return false;
            }
        }
        for (let i = 0; i < (sl-fl)/2; i++)
        {
            if (second.word[i] !== second.word[sl-fl - i - 1])
            {
                return false;
            }
        }
        return true;
    }
}