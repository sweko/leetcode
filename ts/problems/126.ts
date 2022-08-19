import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[string, string, string[]], string[][]> = {
    name: 'Split Array into Consecutive Subsequences',
    id: 659,
    url: 'https://leetcode.com/problems/split-array-into-consecutive-subsequences/',
    solution: paramWrapper(findLadders),
    tests: [
        {
            id: 1,
            argument: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]],
            result: [["hit", "hot", "dot", "dog", "cog"], ["hit", "hot", "lot", "log", "cog"]]
        },
        {
            id: 2,
            argument: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]],
            result: []
        },
        {
            id: 3,
            argument: ["hot", "dog", ["hot", "dog"]],
            result: []
        },
        {
            id: 4,
            argument: ["cet", "ism", ["kid", "tag", "pup", "ail", "tun", "woo", "erg", "luz", "brr", "gay", "sip", "kay", "per", "val", "mes", "ohs", "now", "boa", "cet", "pal", "bar", "die", "war", "hay", "eco", "pub", "lob", "rue", "fry", "lit", "rex", "jan", "cot", "bid", "ali", "pay", "col", "gum", "ger", "row", "won", "dan", "rum", "fad", "tut", "sag", "yip", "sui", "ark", "has", "zip", "fez", "own", "ump", "dis", "ads", "max", "jaw", "out", "btu", "ana", "gap", "cry", "led", "abe", "box", "ore", "pig", "fie", "toy", "fat", "cal", "lie", "noh", "sew", "ono", "tam", "flu", "mgm", "ply", "awe", "pry", "tit", "tie", "yet", "too", "tax", "jim", "san", "pan", "map", "ski", "ova", "wed", "non", "wac", "nut", "why", "bye", "lye", "oct", "old", "fin", "feb", "chi", "sap", "owl", "log", "tod", "dot", "bow", "fob", "for", "joe", "ivy", "fan", "age", "fax", "hip", "jib", "mel", "hus", "sob", "ifs", "tab", "ara", "dab", "jag", "jar", "arm", "lot", "tom", "sax", "tex", "yum", "pei", "wen", "wry", "ire", "irk", "far", "mew", "wit", "doe", "gas", "rte", "ian", "pot", "ask", "wag", "hag", "amy", "nag", "ron", "soy", "gin", "don", "tug", "fay", "vic", "boo", "nam", "ave", "buy", "sop", "but", "orb", "fen", "paw", "his", "sub", "bob", "yea", "oft", "inn", "rod", "yam", "pew", "web", "hod", "hun", "gyp", "wei", "wis", "rob", "gad", "pie", "mon", "dog", "bib", "rub", "ere", "dig", "era", "cat", "fox", "bee", "mod", "day", "apr", "vie", "nev", "jam", "pam", "new", "aye", "ani", "and", "ibm", "yap", "can", "pyx", "tar", "kin", "fog", "hum", "pip", "cup", "dye", "lyx", "jog", "nun", "par", "wan", "fey", "bus", "oak", "bad", "ats", "set", "qom", "vat", "eat", "pus", "rev", "axe", "ion", "six", "ila", "lao", "mom", "mas", "pro", "few", "opt", "poe", "art", "ash", "oar", "cap", "lop", "may", "shy", "rid", "bat", "sum", "rim", "fee", "bmw", "sky", "maj", "hue", "thy", "ava", "rap", "den", "fla", "auk", "cox", "ibo", "hey", "saw", "vim", "sec", "ltd", "you", "its", "tat", "dew", "eva", "tog", "ram", "let", "see", "zit", "maw", "nix", "ate", "gig", "rep", "owe", "ind", "hog", "eve", "sam", "zoo", "any", "dow", "cod", "bed", "vet", "ham", "sis", "hex", "via", "fir", "nod", "mao", "aug", "mum", "hoe", "bah", "hal", "keg", "hew", "zed", "tow", "gog", "ass", "dem", "who", "bet", "gos", "son", "ear", "spy", "kit", "boy", "due", "sen", "oaf", "mix", "hep", "fur", "ada", "bin", "nil", "mia", "ewe", "hit", "fix", "sad", "rib", "eye", "hop", "haw", "wax", "mid", "tad", "ken", "wad", "rye", "pap", "bog", "gut", "ito", "woe", "our", "ado", "sin", "mad", "ray", "hon", "roy", "dip", "hen", "iva", "lug", "asp", "hui", "yak", "bay", "poi", "yep", "bun", "try", "lad", "elm", "nat", "wyo", "gym", "dug", "toe", "dee", "wig", "sly", "rip", "geo", "cog", "pas", "zen", "odd", "nan", "lay", "pod", "fit", "hem", "joy", "bum", "rio", "yon", "dec", "leg", "put", "sue", "dim", "pet", "yaw", "nub", "bit", "bur", "sid", "sun", "oil", "red", "doc", "moe", "caw", "eel", "dix", "cub", "end", "gem", "off", "yew", "hug", "pop", "tub", "sgt", "lid", "pun", "ton", "sol", "din", "yup", "jab", "pea", "bug", "gag", "mil", "jig", "hub", "low", "did", "tin", "get", "gte", "sox", "lei", "mig", "fig", "lon", "use", "ban", "flo", "nov", "jut", "bag", "mir", "sty", "lap", "two", "ins", "con", "ant", "net", "tux", "ode", "stu", "mug", "cad", "nap", "gun", "fop", "tot", "sow", "sal", "sic", "ted", "wot", "del", "imp", "cob", "way", "ann", "tan", "mci", "job", "wet", "ism", "err", "him", "all", "pad", "hah", "hie", "aim"]],
            result: [
                ['cet', 'cot', 'con', 'ion', 'inn', 'ins', 'its', 'ito', 'ibo', 'ibm', 'ism'],
                ['cet', 'cat', 'can', 'ian', 'inn', 'ins', 'its', 'ito', 'ibo', 'ibm', 'ism']
            ]
        },
        {
            id: 5,
            argument: ["aaaaa", "ggggg", ["aaaaa","caaaa","cbaaa","daaaa","dbaaa","eaaaa","ebaaa","faaaa","fbaaa","gaaaa","gbaaa","haaaa","hbaaa","iaaaa","ibaaa","jaaaa","jbaaa","kaaaa","kbaaa","laaaa","lbaaa","maaaa","mbaaa","naaaa","nbaaa","oaaaa","obaaa","paaaa","pbaaa","bbaaa","bbcaa","bbcba","bbdaa","bbdba","bbeaa","bbeba","bbfaa","bbfba","bbgaa","bbgba","bbhaa","bbhba","bbiaa","bbiba","bbjaa","bbjba","bbkaa","bbkba","bblaa","bblba","bbmaa","bbmba","bbnaa","bbnba","bboaa","bboba","bbpaa","bbpba","bbbba","abbba","acbba","dbbba","dcbba","ebbba","ecbba","fbbba","fcbba","gbbba","gcbba","hbbba","hcbba","ibbba","icbba","jbbba","jcbba","kbbba","kcbba","lbbba","lcbba","mbbba","mcbba","nbbba","ncbba","obbba","ocbba","pbbba","pcbba","ccbba","ccaba","ccaca","ccdba","ccdca","cceba","cceca","ccfba","ccfca","ccgba","ccgca","cchba","cchca","cciba","ccica","ccjba","ccjca","cckba","cckca","cclba","cclca","ccmba","ccmca","ccnba","ccnca","ccoba","ccoca","ccpba","ccpca","cccca","accca","adcca","bccca","bdcca","eccca","edcca","fccca","fdcca","gccca","gdcca","hccca","hdcca","iccca","idcca","jccca","jdcca","kccca","kdcca","lccca","ldcca","mccca","mdcca","nccca","ndcca","occca","odcca","pccca","pdcca","ddcca","ddaca","ddada","ddbca","ddbda","ddeca","ddeda","ddfca","ddfda","ddgca","ddgda","ddhca","ddhda","ddica","ddida","ddjca","ddjda","ddkca","ddkda","ddlca","ddlda","ddmca","ddmda","ddnca","ddnda","ddoca","ddoda","ddpca","ddpda","dddda","addda","aedda","bddda","bedda","cddda","cedda","fddda","fedda","gddda","gedda","hddda","hedda","iddda","iedda","jddda","jedda","kddda","kedda","lddda","ledda","mddda","medda","nddda","nedda","oddda","oedda","pddda","pedda","eedda","eeada","eeaea","eebda","eebea","eecda","eecea","eefda","eefea","eegda","eegea","eehda","eehea","eeida","eeiea","eejda","eejea","eekda","eekea","eelda","eelea","eemda","eemea","eenda","eenea","eeoda","eeoea","eepda","eepea","eeeea","ggggg","agggg","ahggg","bgggg","bhggg","cgggg","chggg","dgggg","dhggg","egggg","ehggg","fgggg","fhggg","igggg","ihggg","jgggg","jhggg","kgggg","khggg","lgggg","lhggg","mgggg","mhggg","ngggg","nhggg","ogggg","ohggg","pgggg","phggg","hhggg","hhagg","hhahg","hhbgg","hhbhg","hhcgg","hhchg","hhdgg","hhdhg","hhegg","hhehg","hhfgg","hhfhg","hhigg","hhihg","hhjgg","hhjhg","hhkgg","hhkhg","hhlgg","hhlhg","hhmgg","hhmhg","hhngg","hhnhg","hhogg","hhohg","hhpgg","hhphg","hhhhg","ahhhg","aihhg","bhhhg","bihhg","chhhg","cihhg","dhhhg","dihhg","ehhhg","eihhg","fhhhg","fihhg","ghhhg","gihhg","jhhhg","jihhg","khhhg","kihhg","lhhhg","lihhg","mhhhg","mihhg","nhhhg","nihhg","ohhhg","oihhg","phhhg","pihhg","iihhg","iiahg","iiaig","iibhg","iibig","iichg","iicig","iidhg","iidig","iiehg","iieig","iifhg","iifig","iighg","iigig","iijhg","iijig","iikhg","iikig","iilhg","iilig","iimhg","iimig","iinhg","iinig","iiohg","iioig","iiphg","iipig","iiiig","aiiig","ajiig","biiig","bjiig","ciiig","cjiig","diiig","djiig","eiiig","ejiig","fiiig","fjiig","giiig","gjiig","hiiig","hjiig","kiiig","kjiig","liiig","ljiig","miiig","mjiig","niiig","njiig","oiiig","ojiig","piiig","pjiig","jjiig","jjaig","jjajg","jjbig","jjbjg","jjcig","jjcjg","jjdig","jjdjg","jjeig","jjejg","jjfig","jjfjg","jjgig","jjgjg","jjhig","jjhjg","jjkig","jjkjg","jjlig","jjljg","jjmig","jjmjg","jjnig","jjnjg","jjoig","jjojg","jjpig","jjpjg","jjjjg","ajjjg","akjjg","bjjjg","bkjjg","cjjjg","ckjjg","djjjg","dkjjg","ejjjg","ekjjg","fjjjg","fkjjg","gjjjg","gkjjg","hjjjg","hkjjg","ijjjg","ikjjg","ljjjg","lkjjg","mjjjg","mkjjg","njjjg","nkjjg","ojjjg","okjjg","pjjjg","pkjjg","kkjjg","kkajg","kkakg","kkbjg","kkbkg","kkcjg","kkckg","kkdjg","kkdkg","kkejg","kkekg","kkfjg","kkfkg","kkgjg","kkgkg","kkhjg","kkhkg","kkijg","kkikg","kkljg","kklkg","kkmjg","kkmkg","kknjg","kknkg","kkojg","kkokg","kkpjg","kkpkg","kkkkg","ggggx","gggxx","ggxxx","gxxxx","xxxxx","xxxxy","xxxyy","xxyyy","xyyyy","yyyyy","yyyyw","yyyww","yywww","ywwww","wwwww","wwvww","wvvww","vvvww","vvvwz","avvwz","aavwz","aaawz","aaaaz"]],
            result: [["aaaaa","aaaaz","aaawz","aavwz","avvwz","vvvwz","vvvww","wvvww","wwvww","wwwww","ywwww","yywww","yyyww","yyyyw","yyyyy","xyyyy","xxyyy","xxxyy","xxxxy","xxxxx","gxxxx","ggxxx","gggxx","ggggx","ggggg"]]
        }
    ]
}

function isOneOff(first: string, second: string): boolean {
    let diff = 0;
    for (let index = 0; index < first.length; index++) {
        const felement = first[index];
        const selement = second[index];
        if (felement !== selement) {
            diff += 1;
            if (diff > 1) {
                return false;
            }
        }
    }
    return diff === 1;
}

type NextMap = Record<string, string[]>;

function buildNeighbours(beginWord: string, inputList: string[]): NextMap {
    const wordList = inputList.includes(beginWord) ? [...inputList] : [...inputList, beginWord];
    const result: Record<string, string[]> = wordList.reduce((acc, word) => ({ ...acc, [word]: [] }), {});
    for (let findex = 0; findex < wordList.length; findex++) {
        const felement = wordList[findex];
        for (let sindex = findex + 1; sindex < wordList.length; sindex++) {
            const selement = wordList[sindex];
            if (isOneOff(felement, selement)) {
                result[felement].push(selement);
                result[selement].push(felement);
            }
        }
    }
    return result;
}

function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    if (!wordList.includes(endWord)) {
        return [];
    }

    const nextInitialMap = buildNeighbours(beginWord, wordList);
    const distanceMap = buildDistance(beginWord, nextInitialMap);
    const nextMap = trimMap(buildNextMap(nextInitialMap, distanceMap, endWord), endWord);

    let chains = [[beginWord]];
    while (chains.every(chain => chain[chain.length - 1] !== endWord)) {
        chains = nextChains(chains, nextMap);
        if (chains.length === 0) {
            return [];
        }
        // console.log(chains[0].length, chains.length);
    }
    const result = chains.filter(chain => chain[chain.length - 1] === endWord);
    return result;
};

function nextChains(chains: string[][], nextMap: NextMap): string[][] {
    const result = [];
    for (const chain of chains) {
        result.push(...nextSteps(chain, nextMap));
    }
    return result;
}

function nextSteps(chain: string[], nextMap: NextMap): string[][] {
    const current = chain[chain.length - 1];
    if (!nextMap[current]) {
        return [];
    }
    return nextMap[current]
        .filter(next => !chain.includes(next))
        .map(next => [...chain, next]);
}

function buildDistance(beginWord: string, nextMap: NextMap) {
    const result = {
        [beginWord]: 1
    };
    const queue = [beginWord];
    while (queue.length !== 0) {
        const word = queue.shift()!;
        const nexts = nextMap[word];
        for (const next of nexts) {
            if (result[next]) {
                continue;
            }
            result[next] = result[word] + 1;
            queue.push(next);
        }
    }
    return result;
}

function buildNextMap(nextInitialMap: NextMap, distanceMap: { [x: string]: number; }, endWord: string): NextMap {
    const keys = Object.keys(nextInitialMap);
    const limit = distanceMap[endWord];
    const result: NextMap = {};
    for (const key of keys) {
        if (distanceMap[key] > limit) {
            continue;
        }
        result[key] = nextInitialMap[key].filter(next => distanceMap[next] > distanceMap[key] && distanceMap[next] <= limit)
    }
    return result;
}

function trimMap(nextInitialMap: NextMap, endWord: string): NextMap {
    let wordArray = Object.keys(nextInitialMap).map(key => ({
        word: key,
        nexts: nextInitialMap[key]
    }));

    let fluff = wordArray.filter(item => item.nexts.length === 0 && item.word !== endWord);
    while (fluff.length !== 0) {
        for (const {word} of fluff) {
            for (const wordItem of wordArray) {
                if (wordItem.nexts.includes(word)) {
                    wordItem.nexts = wordItem.nexts.filter(w => w !== word);
                }
            }
        }

        fluff = wordArray.filter(item => item.nexts.length === 0 && item.word !== endWord);
        wordArray = wordArray.filter(item => item.nexts.length !== 0 || item.word === endWord);
    }


    return wordArray.reduce((acc, wi) => ({...acc, [wi.word]: wi.nexts}), {});
}

