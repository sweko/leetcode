import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number], number> = {
    name: 'Bag of Tokens',
    id: 948,
    url: 'https://leetcode.com/problems/bag-of-tokens/',
    solution: paramWrapper(bagOfTokensScore),
    tests: [
        {
            id: 1,
            argument: [[100], 50],
            result: 0
        },
        {
            id: 2,
            argument: [[100,200], 150],
            result: 1
        },
        {
            id: 3,
            argument: [[100,200,300,400], 200],
            result: 2
        },
        {
            id: 4,
            argument: [[52,65,35,88,28,1,4,68,56,95], 94],
            result: 5
        },
        {
            id: 5,
            argument: [[9429,3028,4080,8100,622,6409,1273,2870,8299,555,359,4178,4918,8633,7171], 6735],
            result: 7
        },
        {
            id: 6,
            argument: [[71,55,82], 54],
            result: 0
        }
    ]
}

const memo:Record<string, number> = {};

function getMaxScore(tokens: number[], power: number, score: number) : number {
    const key = `${tokens.join(",")}:${power}:${score}`;
    if (memo[key]) {
        return memo[key];
    }

    let max = score;

    for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];
        if (power >= token) {
            const otherTokens = tokens.slice();
            otherTokens.splice(index, 1);
            const nextScore = getMaxScore(otherTokens, power-token, score+1);
            if (nextScore > max) {
                max = nextScore;
            }
        }
        if (score >=1) {
            const otherTokens = tokens.slice();
            otherTokens.splice(index, 1);
            const nextScore = getMaxScore(otherTokens, power+token, score-1);
            if (nextScore > max) {
                max = nextScore;
            }
        }
    }
    memo[key] = max;
    return max;
}

function bagOfTokensScoreMemo(tokens: number[], power: number): number {
    tokens.sort((a, b) => a-b);
    const result = getMaxScore(tokens, power, 0);
    console.log(Object.keys(memo).length);
    return result;
}

function bagOfTokensScore(tokens: number[], power: number): number {
    const chips = tokens.slice();
    chips.sort((a, b) => a-b);

    let score = 0;

    while (chips.length > 0) {
        while (chips.length > 0 && power >= chips[0]) {
            const chip = chips.shift()!;
            power -= chip;
            score += 1;
        }
        if (chips.length <= 1) {
            return score;
        }
        if (score === 0) {
            return score;
        }
        const chip = chips.pop()!;
        power += chip;
        score -= 1;
    }
    return score;
}


/**
 * If your current power is at least tokens[i], you may play the ith token face up, losing tokens[i] power and gaining 1 score.
   If your current score is at least 1, you may play the ith token face down, gaining tokens[i] power and losing 1 score.
 */