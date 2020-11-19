"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runHardestWordBaseline = void 0;
// return a list of predictions this baseline creates
exports.runHardestWordBaseline = (n5, n4, n3, n2, n1, regression, documents) => {
    const predictions = [];
    documents.forEach((document) => {
        predictions.push(getHardestWord(n5, n4, n3, n2, n1, regression, document));
    });
    return predictions;
};
// return the predictions for this specific document
const getHardestWord = (n5, n4, n3, n2, n1, regression, document) => {
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
    let result = 5;
    words.forEach((word) => {
        result = Math.min(getJLPT(word, n1, n2, n3, n4, n5, regression), result);
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
    return 6; // effectively do not consider unlisted words
};
//# sourceMappingURL=hardestWord.js.map