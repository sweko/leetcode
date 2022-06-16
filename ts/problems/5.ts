// https://leetcode.com/problems/longest-palindromic-substring/

import { Problem } from "../model";

export const problem: Problem<string, string> = {
    name: 'Longest Palindromic Substring',
    id: 5,
    url: 'https://leetcode.com/problems/longest-palindromic-substring/',
    solution: longestPalindrome,
    tests: [
        {
            id: 1,
            argument: "babad",
            result: "bab"
        },
        {
            id: 2,
            argument: "cbbd",
            result: "bb"
        }
    ]
}

function longestPalindrome(s: string): string {
    if (s.length < 2) {
        return s;
    }
    let longest = {left: 0, right: 0, length: 1};
    // odd length palindromes
    for (let index = 0; index < s.length; index++) {
        let left = index - 1;
        let right = index + 1;
        let length = 1;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            length +=2;
            left--;
            right++;
        }
        if (length > longest.length) {
            longest = {
                left: left+1, 
                right: right-1, 
                length
            };
        }
    }
    // even length palindromes
    for (let index = 0; index < s.length; index++) {
        let left = index;
        let right = index + 1;
        let length = 0;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            length +=2;
            left--;
            right++;
        }
        if (length > longest.length) {
            longest = {
                left: left+1, 
                right: right-1, 
                length
            };
        }
    }
    return s.substring(longest.left, longest.right+1);
};
