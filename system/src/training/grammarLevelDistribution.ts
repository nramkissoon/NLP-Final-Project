// module for calculating grammar level distributions
import { Document } from '../document_parsing/documentParsing'
import { Sentence } from '../mecab/mecabOutput'
import { GrammarParser } from './../grammar_parsing/grammar_parser'

export interface JLPTGrammarLists {
  1: GrammarParser[],
  2: GrammarParser[],
  3: GrammarParser[],
  4: GrammarParser[],
  5: GrammarParser[]
}

export const calculateGrammarLevelDistributionEntireTrainingCorpus = () => {

}

export const calculateGrammarLevelDistributionFeaturesForEachDocument = (documents: Document[], jlptGrammarLists: JLPTGrammarLists) => {
  const result: number[][] = [];
  documents.forEach((document: Document) => {
    let documentFeatures = [0, 0, 0, 0, 0, 0];
    let documentLevel = document.level;
    let grammarLevelCount = getGrammarLevelCountsForDocument(document, jlptGrammarLists);
    let totalGrammar = grammarLevelCount.reduce((a, b) => a + b);
    for (let i = 0; i < grammarLevelCount.length; i += 1) {
      documentFeatures[i] = grammarLevelCount[i] / totalGrammar;
    }
    documentFeatures[5] = documentLevel;
    result.push(documentFeatures);
  });
  return result;
}

export const getGrammarLevelCountsForDocument = (document: Document, jlptGrammarLists: JLPTGrammarLists) => {
  const grammerLevelCounts: number[] = [0, 0, 0, 0, 0]
  document.documentText.forEach((sentence: Sentence) => {
    Object.keys(jlptGrammarLists).forEach((level) => {
      jlptGrammarLists[level].forEach((grammarParser: GrammarParser) => {
        grammerLevelCounts[parseInt(level) - 1] += grammarParser.parse(sentence);
      });
    });
  });
  return grammerLevelCounts;
}
