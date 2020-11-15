// Classes for predicting JLPT level of unlisted words

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export interface JLPTKanjiLists {
  lists: Set<string>[]; 
}

export interface UnigramFreqList {
  words: Record<string, number>;
}

export const isCharacterKanji = (character: string): boolean => {
  const KANJI_START_CHAR_CODE = 19968;
  const KANJI_END_CHAR_CODE = 40879;
  if (character.length !== 1) {
    return false;
  }
  const charCode = character.charCodeAt(0);
  return charCode >= KANJI_START_CHAR_CODE && charCode <= KANJI_END_CHAR_CODE;
}

export const wordContainsKanji = (word: string): boolean => {
  for (let index = 0; index < word.length; index++){
    if (isCharacterKanji(word.charAt(index))) return true;
  }
  return false;
}


export class JLPTWordRegression {
  kanjiLists: JLPTKanjiLists = null;
  unigramFreqList: UnigramFreqList = null;
  unigramFreqCoef: number = 0;
  modeKanjiLevelCoef: number = 0;
  hardestKanjiLevelCoef: number = 0;

  constructor(
    kanjiLists: JLPTKanjiLists,
    unigramFreqList: UnigramFreqList,
    unigramCoef: number,
    modeKanjiCoef: number,
    hardestKanjiCoef: number) {
    
    this.kanjiLists = kanjiLists;
    this.unigramFreqList = unigramFreqList;
    this.unigramFreqCoef = unigramCoef;
    this.modeKanjiLevelCoef = modeKanjiCoef;
    this.hardestKanjiLevelCoef = hardestKanjiCoef;
  }
  
  getModeKanjiLevel = (word: string) => {
    let result: number = 5;
    let mode: number = 0;
    if (!wordContainsKanji(word)) return result;
    else {
      let levels = [0, 0, 0, 0, 0];
      for (let i = 0; i < word.length; i++) {
        let char = word.charAt(i);
        if (isCharacterKanji(char)) {
          for (let level = 0; level < 5; level += 1) {
            let kanjiList: Set<string> = this.kanjiLists.lists[level];
            if (kanjiList.has(char)) {
              levels[level] += 1;
              mode = Math.max(mode, levels[level]);
            }
          }
        }
      }
      for (let i = levels.length - 1; i >= 0; i--) {
        if (levels[i] >= mode) {
          result = i + 1
        }
      }
    }
    
    return result;
  }

  getUnigramFreq = (word: string) => {
    let result: number = 0;
    if (word in this.unigramFreqList.words) {
      result = this.unigramFreqList.words[word];
    }
    return result;
  }

  getHardestKanji = (word: string) => {
    let result: number = 5;
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      if (isCharacterKanji(char)) {
        let isListed = false;
        for (let level = 0; level < 5; level += 1) {
          let kanjiList: Set<string> = this.kanjiLists.lists[level];
          if (kanjiList.has(char)) {
            result = Math.min(result, level + 1)
            isListed = true;
          }
        }
        if (!isListed) {
          result = 0;
        }
      }
    }
    return result;
  }

  predictJLPT = (word: string) => {
    return this.getModeKanjiLevel(word) * this.modeKanjiLevelCoef + this.getHardestKanji(word) * this.hardestKanjiLevelCoef + this.getUnigramFreq(word) * this.unigramFreqCoef;
  }
}