const data = [
    "Weko2",
    "Aneta",
    "Bojan",
    "Krste1",
    "Krste2",
    "Krste3",
    "Krste1a",
    "Krste1b2",
    "Krste1c",
    "Krste4",
    "Krste10",
    "Krste11",
    "Krste12",
    "Krste103",
    "Krste",
    "Weko"
];


const goodSorter = (() => {
    const regex = /^(\D*)(\d+)(\D?.*)$/;

    return (a: string, b: string) => {
        const aMatch = a.match(regex);
        const bMatch = b.match(regex);

        if (aMatch && bMatch) {
            const aPrefix = aMatch[1];
            const bPrefix = bMatch[1];

            if (aPrefix === bPrefix) {
                const aNumber = parseInt(aMatch[2], 10);
                const bNumber = parseInt(bMatch[2], 10);

                if (aNumber === bNumber) {
                    const aSuffix = aMatch[3];
                    const bSuffix = bMatch[3];

                    return aSuffix.localeCompare(bSuffix);
                }

                return aNumber - bNumber;
            }
        }
        return a.localeCompare(b);
    };
})();

const sorted = data.sort(goodSorter);

//const sorted = data.sort();

console.log(sorted.join("\n"));