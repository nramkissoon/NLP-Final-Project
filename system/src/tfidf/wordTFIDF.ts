import { Sentence, WordData } from '../mecab/mecabOutput';
import { Document } from '../document_parsing/documentParsing';
import { calculateIDF, Vector } from './tfidf';

// return object containing words in document list and idf scores for each
export const getWordIdfScoresFromDocs = (documents: Document[]) => {
  const wordIDF = {}; // resulting words to each idf score
  const wordCounts = {}; // hashmap from words to number of documents each is present in
  const totalDocuments = documents.length;
  documents.forEach((document: Document) => {
    let wordsInDocument = getWordsInDocument(document);
    wordsInDocument.forEach((word: string) => {
      if (!wordCounts[word]) { wordCounts[word] = 1; }
      else { wordCounts[word] += 1; }
    });
  });
  Object.keys(wordCounts).forEach((word: string) => {
    let idfScore = calculateIDF(totalDocuments, wordCounts[word]);
    wordIDF[word] = idfScore;
  });

  return wordIDF;
}

// return list tfidf scores for each document
export const getWordTFIDFVectorsForDocuments = (documents: Document[]) => {
  const vectors: Vector[] = [];
  const wordIDF = getWordIdfScoresFromDocs(documents);
  documents.forEach((document: Document) => {
    let vector: Vector = { values: {} };
    let wordCounts = getWordCountsInDocument(document);
    Object.keys(wordCounts).forEach((word: string) => {
      vector.values[word] = wordIDF[word] * wordCounts[word];
    });
    vectors.push(vector);
  });
  return vectors;
}


const getWordCountsInDocument = (document: Document) => {
  const words: Record<string, number> = {};
  document.documentText.forEach((sentence: Sentence) => {
    let wordsInSent: WordData[] = sentence.getWordsForWordComplexityComponent();
    wordsInSent.forEach((word: WordData) => {
      if (word.original) {
        if (!words[word.original]) { words[word.original] = 1 }
        else { words[word.original] += 1 };
      }
      else {
        if (!words[word.kanji]) { words[word.kanji] = 1 }
        else { words[word.kanji] += 1; }
      }
    });
  });
  return words;
}

const getWordsInDocument = (document: Document) => {
  const words: Set<string> = new Set();
  document.documentText.forEach((sentence: Sentence) => {
    let wordsInSent: WordData[] = sentence.getWordsForWordComplexityComponent();
    wordsInSent.forEach((word: WordData) => {
      if (word.original) { words.add(word.original); }
      else { words.add(word.kanji); }
    });
  });
  return words;
}