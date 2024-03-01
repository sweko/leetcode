import { Problem } from "../model";

export const problem: Problem<number[], number> = {
    name: 'Candy',
    id: 135,
    url: 'https://leetcode.com/problems/candy',
    solution: candy,
    tests: [
        {
            id: 1,
            argument: [1, 0, 2],
            result: 5
        },
        {
            id: 2,
            argument: [1, 2, 2],
            result: 4
        }
    ]
}

function candy(ratings: number[]): number {
    // ported from C# solution
    if (ratings.length === 1) {
        return 1;
    }

    const candies = ratings.map(r => r + 1);

    let index = 0;
    while (index < candies.length) {
        let value: number;
        if (index === 0) {
            // first
            if (ratings[1] >= ratings[0]) {
                value = 1;
            }
            else {
                value = candies[1] + 1;
            }
        }
        else if (index === candies.length - 1) {
            if (ratings[index - 1] >= ratings[index]) {
                value = 1;
            }
            else {
                value = candies[index - 1] + 1;
            }
        }
        else {
            // other 
            const left = ratings[index - 1];
            const right = ratings[index + 1];
            const cleft = candies[index - 1];
            const cright = candies[index + 1];

            if (left < right) {
                if (ratings[index] <= left) {
                    value = 1;
                }
                else if (ratings[index] <= right) {
                    value = cleft + 1;
                }
                else {
                    value = Math.max(cleft, cright) + 1;
                }
            }
            else if (right < left) {
                if (ratings[index] <= right) {
                    value = 1;
                }
                else if (ratings[index] <= left) {
                    value = cright + 1;
                }
                else {
                    value = Math.max(cleft, cright) + 1;
                }
            }
            else {
                if (ratings[index] <= left) {
                    value = 1;
                }
                else {
                    value = Math.max(cleft, cright) + 1;
                }
            }
        }


        // backtrack if change detected
        if (value < candies[index]) {
            candies[index] = value;
            index -= 1;
            if (index === -1) {
                index = 0;
            }
        }
        else {
            index += 1;
        }
    }

    return candies.reduce((a, b) => a + b, 0);
};
