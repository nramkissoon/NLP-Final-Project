import { Sentence, WordData } from '../mecab/mecabOutput'
import { Document } from '../document_parsing/documentParsing'
import { JLPTWordRegression } from '../regression/wordRegression'

// return a list of predictions this baseline creates
export const runHardestWordBaseline = (n5, n4, n3, n2, n1, regression: JLPTWordRegression, documents: Document[]) => {
  const predictions: number[] = [];
  documents.forEach((document: Document) => {
    predictions.push(getHardestWord(n5, n4, n3, n2, n1, regression, document));
  });
  return predictions;
}

// return the predictions for this specific document
const getHardestWord = (n5, n4, n3, n2, n1, regression: JLPTWordRegression, document: Document) => {
  const words: string[] = [];
  document.documentText.forEach((sentence: Sentence) => {
    let sentenceWords = sentence.getWordsForWordComplexityComponent();
    sentenceWords.forEach((word: WordData) => {
      if (word.original) { words.push(word.original); }
      else { words.push(word.kanji); }
    });
  });
  let result = 5;
  words.forEach((word: string) => {
    
    result = Math.min(getJLPT(word, n1, n2, n3, n4, n5, regression), result);
  });
  return result;
}

const getJLPT = (word, n1, n2, n3, n4, n5, regression: JLPTWordRegression) =>  {
  if (n1.has(word)) return 1;
  if (n2.has(word)) return 2;
  if (n3.has(word)) return 3;
  if (n4.has(word)) return 4;
  if (n5.has(word)) return 5;
  return 6; // effectively do not consider unlisted words
}