"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWordTFIDFVectorsForDocuments = exports.getWordIdfScoresFromDocs = void 0;
const tfidf_1 = require("./tfidf");
// return object containing words in document list and idf scores for each
exports.getWordIdfScoresFromDocs = (documents) => {
    const wordIDF = {}; // resulting words to each idf score
    const wordCounts = {}; // hashmap from words to number of documents each is present in
    const totalDocuments = documents.length;
    documents.forEach((document) => {
        let wordsInDocument = getWordsInDocument(document);
        wordsInDocument.forEach((word) => {
            if (!wordCounts[word]) {
                wordCounts[word] = 1;
            }
            else {
                wordCounts[word] += 1;
            }
        });
    });
    Object.keys(wordCounts).forEach((word) => {
        let idfScore = tfidf_1.calculateIDF(totalDocuments, wordCounts[word]);
        wordIDF[word] = idfScore;
    });
    return wordIDF;
};
// return list tfidf scores for each document
exports.getWordTFIDFVectorsForDocuments = (documents) => {
    const vectors = [];
    const wordIDF = exports.getWordIdfScoresFromDocs(documents);
    documents.forEach((document) => {
        let vector = { values: {} };
        let wordCounts = getWordCountsInDocument(document);
        Object.keys(wordCounts).forEach((word) => {
            vector.values[word] = wordIDF[word] * wordCounts[word];
        });
        vectors.push(vector);
    });
    return vectors;
};
const getWordCountsInDocument = (document) => {
    const words = {};
    document.documentText.forEach((sentence) => {
        let wordsInSent = sentence.getWordsForWordComplexityComponent();
        wordsInSent.forEach((word) => {
            if (word.original) {
                if (!words[word.original]) {
                    words[word.original] = 1;
                }
                else {
                    words[word.original] += 1;
                }
                ;
            }
            else {
                if (!words[word.kanji]) {
                    words[word.kanji] = 1;
                }
                else {
                    words[word.kanji] += 1;
                }
            }
        });
    });
    return words;
};
const getWordsInDocument = (document) => {
    const words = new Set();
    document.documentText.forEach((sentence) => {
        let wordsInSent = sentence.getWordsForWordComplexityComponent();
        wordsInSent.forEach((word) => {
            if (word.original) {
                words.add(word.original);
            }
            else {
                words.add(word.kanji);
            }
        });
    });
    return words;
};
//# sourceMappingURL=wordTFIDF.js.map