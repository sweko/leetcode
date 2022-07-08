import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[string, string, string], boolean> = {
    name: 'Interleaving String',
    id: 97,
    url: 'https://leetcode.com/problems/interleaving-string/',
    solution: paramWrapper(isInterleave),
    tests: [
        {
            id: 1,
            argument: ["aabcc", "dbbca", "aadbbcbcac"],
            result: true
        },
        {
            id: 2,
            argument: ["aabcc", "dbbca", "aadbbbaccc"],
            result: false
        },
        {
            id: 3,
            argument: ["", "", ""],
            result: true
        },
        {
            id: 4,
            argument: [
                "bcbccabcccbcbbbcbbacaaccccacbaccabaccbabccbabcaabbbccbbbaa",
                "ccbccaaccabacaabccaaccbabcbbaacacaccaacbacbbccccbac",
                "bccbcccabbccaccaccacbacbacbabbcbccbaaccbbaacbcbaacbacbaccaaccabcaccacaacbacbacccbbabcccccbababcaabcbbcccbbbaa"
            ],
            result: false
        }
    ]
}

const memo: Record<string, {value: boolean}> = {};

function isInterleave(s1: string, s2: string, s3: string): boolean {

    const key = `${s1}.${s2}.${s3}`;
    if (memo[key])
    {
        return memo[key].value;
    }

    if (s1 === "") {
        const result = s2 === s3;
        //memo[key] = {value: result};
        return result;
    }
    if (s2 === "") {
        const result = s1 === s3;
        //memo[key] = {value: result};
        return result;
    }
    if (s1.length + s2.length !== s3.length) {
        //memo[key] = {value: false};
        return false;
    }

    if (s1[0] === s3[0]) {
        if (isInterleave(s1.substring(1), s2, s3.substring(1))) {
            //memo[key] = {value: true};
            return true;
        }
    }

    if (s2[0] === s3[0]) {
        if (isInterleave(s1, s2.substring(1), s3.substring(1))) {
            //memo[key] = {value: true};
            return true;
        }
    }

    //memo[key] = {value: false};
    return false;
};