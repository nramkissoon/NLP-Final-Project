// module for handling system output

// returns list of predictions
export const getMostCosineSimilar = (data: number[][]) => {
  const predictions: number[] = [];
  data.forEach((values) => {
    let closestLevel = 1;
    let currMax = 0;
    for (let i = 0; i < 5; i += 1) {
      if (values[i] > currMax) {
        currMax = values[i];
        closestLevel = i + 1
      }
    }
    predictions.push(closestLevel);
  });
  return predictions;
}