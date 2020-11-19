"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.augmentJLPTWordQueryVectors = exports.createJLPTWordQueryVectors = void 0;
// return list of 5 query vectors consisting of JLPT listed only words
exports.createJLPTWordQueryVectors = (jlptLists, wordIDF, regression) => {
    const vectors = [];
    jlptLists.forEach((jlptSet) => {
        let vector = { values: {} };
        jlptSet.forEach((word) => {
            if (word in wordIDF) {
                vector.values[word] = 1 * wordIDF[word];
            }
        });
        vectors.push(vector);
    });
    return vectors;
};
// augment vectors with unlisted words
exports.augmentJLPTWordQueryVectors = (vectors, jlptLists, wordIDF, regression) => {
    Object.keys(wordIDF).forEach((word) => {
        if (!listedInJLPT(word, jlptLists[0], jlptLists[1], jlptLists[2], jlptLists[3], jlptLists[4])) {
            let level = regression.predictJLPT(word);
            vectors[level - 1].values[word] = 1 * wordIDF[word];
        }
    });
    return vectors;
};
const listedInJLPT = (word, n1, n2, n3, n4, n5) => {
    if (n1.has(word))
        return true;
    if (n2.has(word))
        return true;
    if (n3.has(word))
        return true;
    if (n4.has(word))
        return true;
    if (n5.has(word))
        return true;
    return false;
};
//# sourceMappingURL=wordQueryVector.js.map