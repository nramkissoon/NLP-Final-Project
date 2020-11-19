"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParticles = exports.auxVerbOriginalReplaceParseChainable = exports.verbStemParseChainable = exports.verbDictParseChainable = exports.verbDictReplaceParseChainable = exports.nadjParseChainable = exports.adjTeStemParseChainable = exports.verbNegativeStemParseChainable = exports.particleParseChainable = exports.adverbParseChainable = exports.nounParseChainable = exports.verbCasualParseChainable = exports.vCasualParse = exports.originalParse = void 0;
const mecabOutput_1 = require("./../mecab/mecabOutput");
exports.originalParse = (sentence) => {
    let result = [];
    sentence.tokens.forEach((token) => {
        if (token.original) {
            result.push(token.original);
        }
        else {
            result.push('');
        }
    });
    return result;
};
exports.vCasualParse = (sentence) => {
    let result = [];
    sentence.tokens.forEach((token) => {
        if ((token.lexical === mecabOutput_1.Lexicals.VERB || token.lexical === mecabOutput_1.Lexicals.AUX_VERB) && token.inflection === mecabOutput_1.Inflections.DICT) {
            result.push('V-casual');
        }
        else {
            result.push(token.kanji);
        }
    });
    return result;
};
exports.verbCasualParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.VERB || token.lexical === mecabOutput_1.Lexicals.AUX_VERB) && token.inflection === mecabOutput_1.Inflections.DICT) {
                result[i] = token.kanji + 'V-casual';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.nounParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.NOUN)) {
                result[i] = token.kanji + 'N';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.adverbParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.ADVERB)) {
                result[i] = token.kanji + 'ADV';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.particleParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.PARTICLE)) {
                result[i] = token.kanji + 'P';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.verbNegativeStemParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.VERB || token.lexical === mecabOutput_1.Lexicals.AUX_VERB) && token.inflection === mecabOutput_1.Inflections.NAI_STEM_V) {
                result[i] = token.kanji + 'V-neg';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.adjTeStemParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.I_ADJ) && token.inflection === mecabOutput_1.Inflections.TE_STEM) {
                result[i] = token.kanji + 'ADJ-TE-STEM';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.nadjParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if (token.lexical === mecabOutput_1.Lexicals.NOUN && token.compound === mecabOutput_1.Compounds.NA_ADJ) {
                result[i] = token.kanji + 'NADJ';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.verbDictReplaceParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.VERB)) {
                result[i] = token.original + 'V-DICT-FORM';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.verbDictParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if ((token.lexical === mecabOutput_1.Lexicals.VERB) && token.compound === mecabOutput_1.Compounds.INDEP && token.kanji === token.original) {
                result[i] = token.original + 'V-DICT-FORM';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.verbStemParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if (token.lexical === mecabOutput_1.Lexicals.VERB && token.inflection === mecabOutput_1.Inflections.STEM) {
                result[i] = token.kanji + 'V-stem';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.auxVerbOriginalReplaceParseChainable = (sentence, result, wordsLeft) => {
    let i = 0;
    sentence.tokens.forEach((token) => {
        if (wordsLeft[i] !== null) {
            if (token.lexical === mecabOutput_1.Lexicals.AUX_VERB) {
                result[i] = token.original + 'AUX-original';
                wordsLeft[i] = null;
            }
            else {
                result[i] = token.kanji;
            }
        }
        i += 1;
    });
    return [result, wordsLeft];
};
exports.getParticles = (sentence) => {
    let result = [];
    sentence.tokens.forEach((token) => {
        if (token.lexical === mecabOutput_1.Lexicals.PARTICLE) {
            result.push(token.original);
        }
        else {
            result.push('');
        }
    });
    return result;
};
//# sourceMappingURL=sentenceParse.js.map