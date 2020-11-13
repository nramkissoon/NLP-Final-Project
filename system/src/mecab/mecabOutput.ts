/**
 * classes and datatypes for easily handling mecab parser output
 */

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
}