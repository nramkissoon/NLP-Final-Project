"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWordLevelDsitributionForEachDocument = exports.calculateWordLevelDistributionsForTrainingCorpus = void 0;
// return number[][] indexed at [word level][document level] = proportion of documents in that level that consist of that word level
exports.calculateWordLevelDistributionsForTrainingCorpus = (documents, n1, n2, n3, n4, n5, regression) => {
    const result = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    const wordLists = [[], [], [], [], []]; // indexed at jlpt level
    documents.forEach((document) => {
        let level = document.level;
        wordLists[level - 1].push(...document.getAllWords());
    });
    for (let i = 0; i < wordLists.length; i += 1) {
        let totalWordsInLevel = wordLists[i].length;
        let wordLevelCounts = [0, 0, 0, 0, 0];
        wordLists[i].forEach((word) => {
            let token = null;
            if (word.original) {
                token = (word.original);
            }
            else {
                token = (word.kanji);
            }
            wordLevelCounts[getJLPT(token, n1, n2, n3, n4, n5, regression) - 1] += 1;
        });
        for (let j = 0; j < wordLevelCounts.length; j += 1) {
            result[j][i] = wordLevelCounts[j] / totalWordsInLevel;
        }
    }
    return result;
};
exports.calculateWordLevelDsitributionForEachDocument = (documents, n1, n2, n3, n4, n5, regression) => {
    const result = [];
    documents.forEach((document) => {
        let documentFeatures = [0, 0, 0, 0, 0, 0, 0];
        let documentLevel = document.level;
        let words = document.getAllWords();
        let totalWords = words.length;
        let wordLevels = [0, 0, 0, 0, 0];
        words.forEach((word) => {
            let token = null;
            if (word.original) {
                token = (word.original);
            }
            else {
                token = (word.kanji);
            }
            wordLevels[getJLPT(token, n1, n2, n3, n4, n5, regression) - 1] += 1;
        });
        for (let i = 0; i < 5; i += 1) {
            documentFeatures[i] = wordLevels[i] / totalWords;
        }
        documentFeatures[5] = document.getAverageSentenceLengthByCharacter();
        documentFeatures[6] = documentLevel;
        result.push(documentFeatures);
    });
    return result;
};
const getJLPT = (word, n1, n2, n3, n4, n5, regression) => {
    if (n1.has(word))
        return 1;
    if (n2.has(word))
        return 2;
    if (n3.has(word))
        return 3;
    if (n4.has(word))
        return 4;
    if (n5.has(word))
        return 5;
    return regression.predictJLPT(word);
};
//# sourceMappingURL=wordLevelDistribution.js.map