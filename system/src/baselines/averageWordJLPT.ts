import { Sentence, WordData } from '../mecab/mecabOutput'
import { Document } from '../document_parsing/documentParsing'
import { JLPTWordRegression } from '../regression/wordRegression'

// return a list of predictions this baseline creates
export const runAverageWordJLPTBaseline = (n5, n4, n3, n2, n1, regression: JLPTWordRegression, documents: Document[]) => {
  const predictions: number[] = [];
  documents.forEach((document: Document) => {
    predictions.push(processDocument(n5, n4, n3, n2, n1, regression, document));
  });
  return predictions;
}

// return the predictions for this specific document
const processDocument = (n5, n4, n3, n2, n1, regression: JLPTWordRegression, document: Document) => {
  const words: string[] = [];
  document.documentText.forEach((sentence: Sentence) => {
    let sentenceWords = sentence.getWordsForWordComplexityComponent();
    sentenceWords.forEach((word: WordData) => {
      if (word.original) { words.push(word.original); }
      else { words.push(word.kanji); }
    });
  });
  const total = words.length;
  let jlptTotal = 0;
  words.forEach((word: string) => {
    jlptTotal += getJLPT(word, n1, n2, n3, n4, n5, regression);
  });
  return jlptTotal / total;
}

const getJLPT = (word, n1, n2, n3, n4, n5, regression: JLPTWordRegression) =>  {
  if (n1.has(word)) return 1;
  if (n2.has(word)) return 2;
  if (n3.has(word)) return 3;
  if (n4.has(word)) return 4;
  if (n5.has(word)) return 5;
  return regression.predictJLPT(word);
}