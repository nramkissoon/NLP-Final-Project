"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCosSimilarityForEachDocForEachQuery = exports.calculateIDF = exports.calculateCosineSimilarity = void 0;
const dotProduct = (A, B) => {
    let total = 0;
    Object.keys(A.values).forEach((word) => {
        if (word in B.values) {
            total += (A.values[word] * B.values[word]);
        }
    });
    return total;
};
const sumOfSquares = (A) => {
    let total = 0;
    Object.keys(A.values).forEach((word) => {
        total += (Math.pow(A.values[word], 2));
    });
    return total;
};
exports.calculateCosineSimilarity = (A, B) => {
    const numerator = dotProduct(A, B);
    const denominator = Math.sqrt(sumOfSquares(A) * sumOfSquares(B));
    return numerator / denominator;
};
exports.calculateIDF = (totalDocuments, numDocsContainingElement) => {
    return Math.log(totalDocuments / numDocsContainingElement);
};
// return number[][] of cosine similarities indexed at [doc][query]
exports.calculateCosSimilarityForEachDocForEachQuery = (docVectors, queryVectors) => {
    const result = [];
    docVectors.forEach((doc) => {
        let docResults = [];
        queryVectors.forEach((query) => {
            docResults.push(exports.calculateCosineSimilarity(doc, query));
        });
        result.push(docResults);
    });
    return result;
};
//# sourceMappingURL=tfidf.js.map