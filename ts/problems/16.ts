import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number], number> = {
    name: '3Sum Closest',
    id: 16,
    url: 'https://leetcode.com/problems/3sum-closest/',
    solution: paramWrapper(threeSumClosest),
    tests: [
        {
            id: 1,
            argument: [[-1,2,1,-4], 1],
            result: 2
        },
        {
            id: 2,
            argument: [[0,0,0], 1],
            result: 0
        },
        {
            id: 3,
            argument: [[-744,572,795,845,-57,-225,874,-600,-818,-725,-449,-140,-236,602,-961,11,358,-97,-884,1,-478,-736,55,-55,-4,667,-931,582,-124,-101,-813,-957,-749,-363,-711,25,834,-906,-5,84,915,-197,773,570,-309,-240,459,-431,-974,949,490,-912,-510,43,-195,473,-983,20,684,975,906,-793,554,-517,202,196,987,-207,-248,128,24,-281,661,-979,-238,-210,506,-208,-110,-303,-694,366,-213,-451,149,861,794,-189,-598,618,216,-534,884,933,-98,288,-131,296,525,573,804,451,-710,603,402,-848,-462,58,271,843,825,23,-666,442,-883,-767,682,-601,-627,411,513,-411,-380,260,-962,-464,122,89,532,741,-50,174,307,-955,440,567,-705,416,-32,726,-648,600,470,-216,839,693,-343,-325,206,-12,119,980,331,-278,948,193,-3,991,286,169,-642,-104,-563,-828,-220,-692,504,-81,77,-152,-676,512,706,210,-875,910,659,-479,176,383,727,-608,456,-408,-320,-387,212,976,236,47,16,94,215,-773,-586,201,455,-139,-40,998,181,-806,-553,395,-258,892,-196,-190,-791,391,-446,-333,321,351,534,-660,-845,-861,392,350,-518,853,91,319,973,542,274,116,-644,-537,249,625,-596,475,-724,-180,468,-26,246,893,-738,-442,-821,-324,-142,-782,102,92,209,484,318,-522,-989,-970,511,-445,-62,-434,-685,374,381,229,654,21,595,399,-667,-421,241,335,-713,650,353,-580,69,566,222,-223,791,40,162,-176,-639,961,417,-816,510,-930,986,652,-843,651,-951,259,-151,294,972,329,-402,-447,-441,-846,770,328,-896,400,-854,611,378,-976,-106,379,398,519,-505,-718,228,-722,-94,571,-712,-53,-889,995,-823,535,772,389,-268,-351,656,-269,71,315,-594,290,382,-60,863,-454,-1000,-193,-226,-924,828,709,-920,-27,529,4,-504,0,911,-554,689,-67,779,74,-338,644,859,-102,-547,170,938,186,927,898,-945,-371,-669,612,-809,-765,-798,-752,-546,-629,-815,-492,-194,414,759,803,908,-80,-127,-892,524,-344,913,-687,-591,594,-264,238,526,93,408,821,984,278,-916,749,129,-741,254,436,-509,902,-719,304,360,-203,-858,-43,146,-716,-292,-659,-520,-543,-409,671,-899,-13,-966,605,868,-803,546,748,49,410,-315,-686,-882,-862,-881,284,-17,-783,-175,865,53,655,599,336,-654,369,-132,-678,-376,-9,-469,-550,311,-857,540,-477,-450,593,308,-24,596,-484,-890,-38,-327,721,614,827,-993,-891,28,-168,-533,-548,974,-564,-406,51,-116,244,864,-527,742,-250,-453,668,752,-880,476,806,493,316,-785,739,-20,-566,207,-329,-72,658,-986,135,-587,-584,214,327,698,172,-233,426,-583,-795,-289,-452,738,-489,99,-243,-994,-114,781,346,-530,897,-155,-923,301,320,256,-668,-633,575,989,-585,-936,-15,-425,-757,639,120,32,-514,-117,-237,725,-933,57,-88,-302,-946,-698,871,-964,-863,-398,-362,681,151,730,872,-96,586,-146,-784,-762,-538,616,-308,-215,-521,452,740,629,-279,627,-76,555,-472,269,234,-794,157,-691,184,-819,124,734,98,-905,-844,-202,-582,-620,-706,113,-512,-879,899,-922,-927,718,205,109,-249,977,-443,-495,-827,-365,86,-332,18,-311,-513,27,979,-525,219,764,-437,405,-272,-273,-804,-171,-222,-285,-977,925,551,-777,-404,-829,491,805,648,131,774,-339,523,-364,-873,-16,-297,-358,-715,-836,-54,793,-673,886,494,-385,-590,-111,-349,-265,-204,607,187,-856,790,-910,324,717,501,-991,-466,387,637,-576,-160,638,19,371,305,-473,796,-357,231,-377,-561,199,-433,744,912,293,788,-498,-623,-568,824,251,802,692,291,-944,41,153,36,900,461,448,-488,-145,263,935,-470,550,882,-486,-919,847,876,245,474,-35,-592,-760,136,798,811,756,-107,344,137,52,808,916,867,670,946,-457,5,303,443,-414,-410,401,568,361,707,403,-768,849,-379,854,558,-672,29,-397,-45,253,-572,-282,-280,79,-529,-2,-745,-253,-985,941,983,-56,-129,232,-219,243,-89,217,732,103,901,242,-174,-810,822,188,699,-841,719,394,507,-143,-901,714,531,-200,862,-428,538,521,-178,418,-109,967,-483,959,-613,337,-780,-937,589,-761,-506,-296,962,-894,150,-378,-943,14,-348,-375,777,503,642,-319,-391,143,355,-77,-501,-834,-463,-683,221,-293,647,643,-415,449,945,-192,-156,-49,495,-150,784,909,687,-383,969,-959,-932,-205,820,623,-68,-456,556,-44,422,339,-647,479,-436,992,-664,-407,-314,-552,-928,-71,767,-872,31,306,-835,-334,716,-939,478,487,460,785,-438,786,-301,-342,12,-632,-51,-797,-852,85,830,-766,-395,310,-287,-640,-99,-886,-42,-185,-247,-735,-934,-212,-573,713,-975,694,375,-651,-887,-170,343,-251,68,-162,728,-575,121,813,-605,-560,634,-427,-416,943,761,787,-577,-779,277,59,-755,160,-211,447,818,505,592,580,167,994,-130,-468,626], -6970],
            result: -2987
        }
    ]
}

function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    let result = Number.POSITIVE_INFINITY;
    for (let findex = 0; findex < nums.length; findex++) {
        const first = nums[findex];
        let sindex = findex + 1;
        let tindex = nums.length - 1;
        while (sindex < tindex) {
            const sum = first + nums[sindex] + nums[tindex];
            if (sum === target) {
                return target;
            }
            if (Math.abs(sum - target) < Math.abs(result - target)) {
                result = sum;
            }
            if (sum < target) {
                sindex++;
            } else {
                tindex--;
            }
        }
    }
    return result;
};