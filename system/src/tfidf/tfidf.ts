
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