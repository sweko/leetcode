import { ClassArgument, Problem } from "../model";
import { classWrapper } from "../utils";

interface Interval {
    start: number;
    end: number;
}

class MyCalendar {
    private intervals: Interval[] = [];

    constructor() {
        this.intervals = [];
    }

    book(start: number, end: number): boolean {
        const others = this.intervals.some(s => s.end > start && s.start < end);
        if (others) {
            return false;
        }
        this.intervals.push({start, end});
        return true;
    }
}

export const problem: Problem<ClassArgument<undefined, [number, number]>, boolean[]> = {
    name: 'My Calendar I',
    id: 729,
    url: 'https://leetcode.com/problems/my-calendar-i/',
    solution: classWrapper(MyCalendar, "book"),
    tests: [
        {
            id: 1,
            argument: {
                initialization: undefined,
                calls: [
                    [10, 20], [15, 25], [20, 30]
                ]
            },
            result: [true, false, true]
        }
    ]
}

