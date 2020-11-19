"use strict";
// Classes for predicting JLPT level of unlisted words
Object.defineProperty(exports, "__esModule", { value: true });
exports.JLPTWordRegression = exports.wordContainsKanji = exports.isCharacterKanji = void 0;
const stopCharacters = ['１', '２', '３', '４', '５', '６', '７', '８', '９', '０', '＃', '＄', '「', '」', '（', '）', '＊', '！', '？', '％'];
exports.isCharacterKanji = (character) => {
    const KANJI_START_CHAR_CODE = 19968;
    const KANJI_END_CHAR_CODE = 40879;
    if (character.length !== 1) {
        return false;
    }
    const charCode = character.charCodeAt(0);
    return charCode >= KANJI_START_CHAR_CODE && charCode <= KANJI_END_CHAR_CODE;
};
exports.wordContainsKanji = (word) => {
    for (let index = 0; index < word.length; index++) {
        if (exports.isCharacterKanji(word.charAt(index)))
            return true;
    }
    return false;
};
class JLPTWordRegression {
    constructor(kanjiLists, unigramFreqList, unigramCoef, modeKanjiCoef, hardestKanjiCoef) {
        this.kanjiLists = null;
        this.unigramFreqList = null;
        this.unigramFreqCoef = 0;
        this.modeKanjiLevelCoef = 0;
        this.hardestKanjiLevelCoef = 0;
        this.getModeKanjiLevel = (word) => {
            let result = 5;
            let mode = 0;
            if (!exports.wordContainsKanji(word))
                return result;
            else {
                let levels = [0, 0, 0, 0, 0];
                for (let i = 0; i < word.length; i++) {
                    let char = word.charAt(i);
                    if (exports.isCharacterKanji(char)) {
                        for (let level = 0; level < 5; level += 1) {
                            let kanjiList = this.kanjiLists.lists[level];
                            if (kanjiList.has(char)) {
                                levels[level] += 1;
                                mode = Math.max(mode, levels[level]);
                            }
                        }
                    }
                }
                for (let i = levels.length - 1; i >= 0; i--) {
                    if (levels[i] >= mode) {
                        result = i + 1;
                    }
                }
            }
            return result;
        };
        this.getUnigramFreq = (word) => {
            let result = 0;
            if (word in this.unigramFreqList.words) {
                result = this.unigramFreqList.words[word];
            }
            return result;
        };
        this.getHardestKanji = (word) => {
            let result = 5;
            for (let i = 0; i < word.length; i++) {
                let char = word.charAt(i);
                if (exports.isCharacterKanji(char)) {
                    let isListed = false;
                    for (let level = 0; level < 5; level += 1) {
                        let kanjiList = this.kanjiLists.lists[level];
                        if (kanjiList.has(char)) {
                            result = Math.min(result, level + 1);
                            isListed = true;
                        }
                    }
                    if (!isListed) {
                        result = 0;
                    }
                }
            }
            return result;
        };
        this.roundLevel = (level) => {
            if (level < 1.5) {
                return 1;
            }
            else if (level < 2.5) {
                return 2;
            }
            else if (level < 3.5) {
                return 3;
            }
            else if (level < 4.5) {
                return 4;
            }
            return 5;
        };
        this.predictJLPT = (word) => {
            let stopWord = false;
            if (!exports.wordContainsKanji(word)) {
                stopWord = true;
            }
            stopCharacters.forEach((number) => {
                if (word.indexOf(number) > -1) {
                    stopWord = true;
                }
            });
            if (stopWord) {
                return 5;
            }
            return this.roundLevel(this.getModeKanjiLevel(word) * this.modeKanjiLevelCoef + this.getHardestKanji(word) * this.hardestKanjiLevelCoef + this.getUnigramFreq(word) * this.unigramFreqCoef);
        };
        this.kanjiLists = kanjiLists;
        this.unigramFreqList = unigramFreqList;
        this.unigramFreqCoef = unigramCoef;
        this.modeKanjiLevelCoef = modeKanjiCoef;
        this.hardestKanjiLevelCoef = hardestKanjiCoef;
    }
}
exports.JLPTWordRegression = JLPTWordRegression;
//# sourceMappingURL=wordRegression.js.map