"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrammarLevelCountsForDocument = exports.calculateGrammarLevelDistributionFeaturesForEachDocument = exports.calculateGrammarLevelDistributionEntireTrainingCorpus = void 0;
exports.calculateGrammarLevelDistributionEntireTrainingCorpus = () => {
};
exports.calculateGrammarLevelDistributionFeaturesForEachDocument = (documents, jlptGrammarLists) => {
    const result = [];
    documents.forEach((document) => {
        let documentFeatures = [0, 0, 0, 0, 0, 0];
        let documentLevel = document.level;
        let grammarLevelCount = exports.getGrammarLevelCountsForDocument(document, jlptGrammarLists);
        let totalGrammar = grammarLevelCount.reduce((a, b) => a + b);
        for (let i = 0; i < grammarLevelCount.length; i += 1) {
            documentFeatures[i] = grammarLevelCount[i] / totalGrammar;
        }
        documentFeatures[5] = documentLevel;
        result.push(documentFeatures);
    });
    return result;
};
exports.getGrammarLevelCountsForDocument = (document, jlptGrammarLists) => {
    const grammerLevelCounts = [0, 0, 0, 0, 0];
    document.documentText.forEach((sentence) => {
        Object.keys(jlptGrammarLists).forEach((level) => {
            jlptGrammarLists[level].forEach((grammarParser) => {
                grammerLevelCounts[parseInt(level) - 1] += grammarParser.parse(sentence);
            });
        });
    });
    return grammerLevelCounts;
};
//# sourceMappingURL=grammarLevelDistribution.js.map