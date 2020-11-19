
export interface Vector {
  values: Record<string, number>;
}

const dotProduct = (A: Vector, B: Vector) => {
  let total = 0;
  Object.keys(A.values).forEach((word: string) => {
    if (word in B.values) {
      total += (A.values[word] * B.values[word])
    }
  });
  return total;
}

const sumOfSquares = (A: Vector) => {
  let total = 0;
  Object.keys(A.values).forEach((word: string) => {
      total += (A.values[word]**2)
  });
  return total;
}

export const calculateCosineSimilarity = (A: Vector, B: Vector) => {
  const numerator = dotProduct(A, B);
  const denominator = Math.sqrt(sumOfSquares(A) * sumOfSquares(B));
  return numerator / denominator;
}

export const calculateIDF = (totalDocuments: number, numDocsContainingElement: number) => {
  return Math.log(totalDocuments / numDocsContainingElement);
}

// return number[][] of cosine similarities indexed at [doc][query]
export const calculateCosSimilarityForEachDocForEachQuery = (docVectors: Vector[], queryVectors: Vector[]) => {
  const result: number[][] = [];
  docVectors.forEach((doc: Vector) => {
    let docResults: number[] = [];
    queryVectors.forEach((query: Vector) => {
      docResults.push(calculateCosineSimilarity(doc, query));
    });
    result.push(docResults);
  });
  return result;
}