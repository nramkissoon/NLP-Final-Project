/**
 * classes and datatypes for easily handling mecab parser output
 */

const stopCharacters = ['１','２','３','４','５','６','７','８','９','０', '＃','＄','「','」','（','）','＊','！','？','％', '、', '[', ']']

export const Lexicals = {
  NOUN: '名詞',
  VERB: '動詞',
  PUNCTUATION: '記号',
  PARTICLE: '助詞',
  I_ADJ: '形容詞',
  AUX_VERB: '助動詞',
  ADVERB: '副詞'
}

export const Compounds = {
  NA_ADJ: '形容動詞語幹',
  INDEP: '自立',
  NOT_INDEP: '非自立',
  CASE_MARK_PARTICLE: '格助詞',
  CONNECTING_PARTICLE: '係助詞',
  PRONOUN: '代名詞',
  CONJUN_PARTICLE: '接続助詞',
  GENERAL: '一般'
}

export const Inflections = {
  STEM: '連用形',
  DICT: '基本形',
  NAI_STEM_V: '未然形',
  TE_STEM: '連用テ接続',
  TA_STEM: '連用タ接続',
  HYPO_FORM: '仮定形'
}

export const isIndepNounAndNotNaAdj = (word: WordData) => {
  return word.lexical === Lexicals.NOUN && (word.compound !== Compounds.NA_ADJ && word.compound !== Compounds.NOT_INDEP);
}

export const isIndepVerb = (word: WordData) => {
  return word.lexical === Lexicals.VERB && word.compound === Compounds.INDEP;
}

export const isNaAdj = (word: WordData) => {
  return word.lexical === Lexicals.NOUN && word.compound === Compounds.NA_ADJ;
}

export const isIndepIAdj = (word: WordData) => {
  return word.lexical === Lexicals.I_ADJ && word.compound === Compounds.INDEP;
}

export const isAdv = (word: WordData) => {
  return word.lexical === Lexicals.ADVERB && word.compound === Compounds.GENERAL;
}

export class WordData {
  kanji: string = null;
  lexical: string = null;
  compound: string = null;
  compound2: string = null;
  compound3: string = null;
  conjugation: string = null;
  inflection: string = null;
  original: string = null;
  reading: string = null;
  pronunciation: string = null;

  constructor(data: string[]) {
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

  getData = (data: string[], index: number) => {
    if (index < data.length) {
      if (data[index] !== '*') {
        return data[index]
      }
    }
  }
}

export class Sentence {
  tokens: WordData[] = []

  constructor(mecabOutput: string[][]) {
    mecabOutput.forEach((token: string[]) => {
      this.tokens.push(new WordData(token));
    });
  }

  /**
   * reconstruct the sentence for debugging purposes
   */
  getSentence = () => {
    let sentence = ""
    this.tokens.forEach((wordData: WordData) => {
      sentence += wordData.kanji;
    });

    return sentence;
  }

  /**
   * return a list of words to be use in the word TFIDF component of the system
   */

  // TODO number stemming
  getWordsForWordComplexityComponent = () => {
    const words: WordData[] = [];
    this.tokens.forEach((word: WordData) => {
      let stopWord = false;
      stopCharacters.forEach((number: string) => {
        if (word.kanji.indexOf(number) > -1) { stopWord = true; }
      });
      if (!stopWord) {
        if (isIndepNounAndNotNaAdj(word) || isIndepVerb(word) || isNaAdj(word) || isAdv(word) || isIndepIAdj(word)) {
          words.push(word)
        }
      }
    });

    return words;
  }
}