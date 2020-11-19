"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarParser = exports.chainParsing = exports.parseStrategies = void 0;
const sentenceParse_1 = require("./sentenceParse");
exports.parseStrategies = {
    ORIGINAL: 'original',
    NONE: 'none',
    VCASUAL: 'V-casual',
    NOUN: 'N',
    PARTICLE: 'P',
    PMATCH: 'P-match',
    ADVERB: 'ADV',
    VNEGSTEM: 'V-neg-stem',
    VDICTREPLACE: 'V-dict-replace',
    NADJ: 'NADJ',
    ADJTESTEM: 'ADJ-te-stem',
    VSTEM: 'V-stem',
    VDICT: 'V-dict',
    AUXVERBORIGINALREPLACE: 'AUX-original-replace'
};
exports.chainParsing = (strategies, sentence) => {
    if (strategies[0] === exports.parseStrategies.NONE && strategies.length === 1) {
        return sentence.getSentence();
    }
    else if (strategies[0] === exports.parseStrategies.ORIGINAL && strategies.length === 1) {
        return sentenceParse_1.originalParse(sentence).join('');
    }
    else if (strategies[0] === exports.parseStrategies.PMATCH && strategies.length === 1) {
        return sentenceParse_1.getParticles(sentence).join('');
    }
    else if (strategies.length === 1 && strategies[0] === exports.parseStrategies.VCASUAL) {
        return sentenceParse_1.vCasualParse(sentence).join('');
    }
    else {
        let words = Array.from(sentence.tokens);
        let result = new Array(words.length);
        for (let i = 0; i < result.length; i += 1) {
            result[i] = '';
        }
        strategies.forEach((strategy) => {
            let r = [];
            if (strategy === exports.parseStrategies.NOUN) {
                r = sentenceParse_1.nounParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.PARTICLE) {
                r = sentenceParse_1.particleParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.ADVERB) {
                r = sentenceParse_1.adverbParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.VNEGSTEM) {
                r = sentenceParse_1.verbNegativeStemParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.VDICTREPLACE) {
                r = sentenceParse_1.verbDictReplaceParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.NADJ) {
                r = sentenceParse_1.nadjParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.ADJTESTEM) {
                r = sentenceParse_1.adjTeStemParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.VSTEM) {
                r = sentenceParse_1.verbStemParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.VCASUAL) {
                r = sentenceParse_1.verbCasualParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.VDICT) {
                r = sentenceParse_1.verbDictParseChainable(sentence, result, words);
            }
            else if (strategy === exports.parseStrategies.AUXVERBORIGINALREPLACE) {
                r = sentenceParse_1.auxVerbOriginalReplaceParseChainable(sentence, result, words);
            }
            words = r[1];
            result = r[0];
        });
        console.log(result.join(""));
        return result.join('');
    }
};
class GrammarParser {
    constructor(regexes, id, level, parseStrategies) {
        this.regexes = [];
        this.id = "";
        //return number of occurences of grammar in sentence
        this.parse = (sentence) => {
            let count = 0;
            for (let i = 0; i < this.parseStrategies.length; i += 1) {
                let regex = this.regexes[i];
                let parsedSentence = exports.chainParsing(this.parseStrategies[i], sentence);
                if (parsedSentence.match(regex)) {
                    count += parsedSentence.match(regex).length;
                }
            }
            return count;
        };
        regexes.forEach((val) => {
            let regex = new RegExp(val, 'g');
            this.regexes.push(regex);
        });
        this.id = id;
        this.level = level;
        this.parseStrategies = parseStrategies;
    }
}
exports.GrammarParser = GrammarParser;
//# sourceMappingURL=grammar_parser.js.map