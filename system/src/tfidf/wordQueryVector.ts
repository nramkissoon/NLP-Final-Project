// create the 5 JLPT word query vectors
import { Vector } from './tfidf';
import { JLPTWordRegression } from './../regression/wordRegression'

// return list of 5 query vectors consisting of JLPT listed only words
export const createJLPTWordQueryVectors = (jlptLists: Set<string>[], wordIDF: Record<string, number>, regression?: JLPTWordRegression) => {
  const vectors: Vector[] = [];
  jlptLists.forEach((jlptSet: Set<string>) => {
    let vector: Vector = { values: {} };
    jlptSet.forEach((word: string) => {
      if (word in wordIDF) { vector.values[word] = 1 * wordIDF[word]; }
    });
    vectors.push(vector)
  });
  return vectors;
}

// augment vectors with unlisted words
export const augmentJLPTWordQueryVectors = (
  vectors: Vector[],
  jlptLists: Set<string>[],
  wordIDF: Record<string, number>,
  regression: JLPTWordRegression) => {
  Object.keys(wordIDF).forEach((word) => {
    if (!listedInJLPT(word, jlptLists[0], jlptLists[1], jlptLists[2], jlptLists[3], jlptLists[4])) {
      let level = regression.predictJLPT(word);
      vectors[level - 1].values[word] = 1 * wordIDF[word];
    }
  });
  return vectors;
}

const listedInJLPT = (word, n1, n2, n3, n4, n5) =>  {
  if (n1.has(word)) return true;
  if (n2.has(word)) return true;
  if (n3.has(word)) return true;
  if (n4.has(word)) return true;
  if (n5.has(word)) return true;
  return false;
}