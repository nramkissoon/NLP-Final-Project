"use strict";
/**
 * classes and datatypes for easily handling mecab parser output
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sentence = exports.WordData = exports.isAdv = exports.isIndepIAdj = exports.isNaAdj = exports.isIndepVerb = exports.isIndepNounAndNotNaAdj = exports.Inflections = exports.Compounds = exports.Lexicals = void 0;
const stopCharacters = ['１', '２', '３', '４', '５', '６', '７', '８', '９', '０', '＃', '＄', '「', '」', '（', '）', '＊', '！', '？', '％', '、', '[', ']'];
exports.Lexicals = {
    NOUN: '名詞',
    VERB: '動詞',
    PUNCTUATION: '記号',
    PARTICLE: '助詞',
    I_ADJ: '形容詞',
    AUX_VERB: '助動詞',
    ADVERB: '副詞',
    CONJUNCTION: '接続詞'
};
exports.Compounds = {
    NA_ADJ: '形容動詞語幹',
    INDEP: '自立',
    NOT_INDEP: '非自立',
    CASE_MARK_PARTICLE: '格助詞',
    CONNECTING_PARTICLE: '係助詞',
    PRONOUN: '代名詞',
    CONJUN_PARTICLE: '接続助詞',
    GENERAL: '一般',
    ADJ_NOUN: '形容動詞語幹'
};
exports.Inflections = {
    STEM: '連用形',
    DICT: '基本形',
    NAI_STEM_V: '未然形',
    TE_STEM: '連用テ接続',
    TA_STEM: '連用タ接続',
    HYPO_FORM: '仮定形',
    VOL_STEM: '未然ウ接続'
};
exports.isIndepNounAndNotNaAdj = (word) => {
    return word.lexical === exports.Lexicals.NOUN && (word.compound !== exports.Compounds.NA_ADJ && word.compound !== exports.Compounds.NOT_INDEP);
};
exports.isIndepVerb = (word) => {
    return word.lexical === exports.Lexicals.VERB && word.compound === exports.Compounds.INDEP;
};
exports.isNaAdj = (word) => {
    return word.lexical === exports.Lexicals.NOUN && word.compound === exports.Compounds.NA_ADJ;
};
exports.isIndepIAdj = (word) => {
    return word.lexical === exports.Lexicals.I_ADJ && word.compound === exports.Compounds.INDEP;
};
exports.isAdv = (word) => {
    return word.lexical === exports.Lexicals.ADVERB && word.compound === exports.Compounds.GENERAL;
};
class WordData {
    constructor(data) {
        this.kanji = null;
        this.lexical = null;
        this.compound = null;
        this.compound2 = null;
        this.compound3 = null;
        this.conjugation = null;
        this.inflection = null;
        this.original = null;
        this.reading = null;
        this.pronunciation = null;
        this.getData = (data, index) => {
            if (index < data.length) {
                if (data[index] !== '*') {
                    return data[index];
                }
            }
        };
        this.kanji = this.getData(data, 0);
        this.lexical = this.getData(data, 1);
        this.compound = this.getData(data, 2);
        this.compound2 = this.getData(data, 3);
        this.compound3 = this.getData(data, 4);
        this.conjugation = this.getData(data, 5);
        this.inflection = this.getData(data, 6);
        this.original = this.getData(data, 7);
        this.reading = this.getData(data, 8);
        this.pronunciation = this.getData(data, 9);
    }
}
exports.WordData = WordData;
class Sentence {
    constructor(mecabOutput) {
        this.tokens = [];
        /**
         * reconstruct the sentence for debugging purposes
         */
        this.getSentence = () => {
            let sentence = "";
            this.tokens.forEach((wordData) => {
                sentence += wordData.kanji;
            });
            return sentence;
        };
        /**
         * return a list of words to be use in the word TFIDF component of the system
         */
        // TODO number stemming
        this.getWordsForWordComplexityComponent = () => {
            const words = [];
            this.tokens.forEach((word) => {
                let stopWord = false;
                stopCharacters.forEach((number) => {
                    if (word.kanji.indexOf(number) > -1) {
                        stopWord = true;
                    }
                });
                if (!stopWord) {
                    if (exports.isIndepNounAndNotNaAdj(word) || exports.isIndepVerb(word) || exports.isNaAdj(word) || exports.isAdv(word) || exports.isIndepIAdj(word)) {
                        words.push(word);
                    }
                }
            });
            return words;
        };
        mecabOutput.forEach((token) => {
            this.tokens.push(new WordData(token));
        });
    }
}
exports.Sentence = Sentence;
//# sourceMappingURL=mecabOutput.js.map