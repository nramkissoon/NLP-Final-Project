"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAverageWordJLPTBaseline = void 0;
// return a list of predictions this baseline creates
exports.runAverageWordJLPTBaseline = (n5, n4, n3, n2, n1, regression, documents) => {
    const predictions = [];
    documents.forEach((document) => {
        predictions.push(processDocument(n5, n4, n3, n2, n1, regression, document));
    });
    return predictions;
};
// return the predictions for this specific document
const processDocument = (n5, n4, n3, n2, n1, regression, document) => {
    const words = [];
    document.documentText.forEach((sentence) => {
        let sentenceWords = sentence.getWordsForWordComplexityComponent();
        sentenceWords.forEach((word) => {
            if (word.original) {
                words.push(word.original);
            }
            else {
                words.push(word.kanji);
            }
        });
    });
    const total = words.length;
    let jlptTotal = 0;
    words.forEach((word) => {
        jlptTotal += getJLPT(word, n1, n2, n3, n4, n5, regression);
    });
    return jlptTotal / total;
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
//# sourceMappingURL=averageWordJLPT.js.map