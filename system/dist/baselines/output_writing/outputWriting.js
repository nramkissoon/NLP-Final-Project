"use strict";
// module for handling system output
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostCosineSimilar = void 0;
// returns list of predictions
exports.getMostCosineSimilar = (data) => {
    const predictions = [];
    data.forEach((values) => {
        let closestLevel = 1;
        let currMax = 0;
        for (let i = 0; i < 5; i += 1) {
            if (values[i] > currMax) {
                currMax = values[i];
                closestLevel = i + 1;
            }
        }
        predictions.push(closestLevel);
    });
    return predictions;
};
//# sourceMappingURL=outputWriting.js.map