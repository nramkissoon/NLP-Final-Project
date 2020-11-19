import { Sentence, WordData, Lexicals, Compounds, Inflections } from './../mecab/mecabOutput'


export const originalParse = (sentence: Sentence) => {
  let result: string[] = []
  sentence.tokens.forEach((token: WordData) => {
    if (token.original) {
      result.push(token.original)
    } else {
      result.push('')
    }
  })
  return result;
}

export const vCasualParse = (sentence: Sentence) => {
  let result: string[] = []
  sentence.tokens.forEach((token: WordData) => {
    if ((token.lexical === Lexicals.VERB || token.lexical === Lexicals.AUX_VERB) && token.inflection === Inflections.DICT) {
      result.push('V-casual')
    } else {
      result.push(token.kanji)
    }
  })
  return result;
}

export const verbCasualParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.VERB || token.lexical === Lexicals.AUX_VERB) && token.inflection === Inflections.DICT) {
        result[i] = token.kanji+'V-casual'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const nounParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.NOUN)) {
        result[i] = token.kanji+'N'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const adverbParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.ADVERB)) {
        result[i] = token.kanji+'ADV'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}


export const particleParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.PARTICLE)) {
        result[i] = token.kanji+'P'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const verbNegativeStemParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.VERB || token.lexical === Lexicals.AUX_VERB) && token.inflection === Inflections.NAI_STEM_V) {
        result[i] = token.kanji+'V-neg'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const adjTeStemParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.I_ADJ) && token.inflection === Inflections.TE_STEM) {
        result[i] = token.kanji+'ADJ-TE-STEM'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const nadjParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if (token.lexical === Lexicals.NOUN && token.compound === Compounds.NA_ADJ) {
        result[i] = token.kanji+'NADJ'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const verbDictReplaceParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.VERB)) {
        result[i] = token.original+'V-DICT-FORM'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const verbDictParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.VERB) && token.compound === Compounds.INDEP && token.kanji === token.original) {
        result[i] = token.original+'V-DICT-FORM'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const verbStemParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if (token.lexical === Lexicals.VERB && token.inflection === Inflections.STEM) {
        result[i] = token.kanji+'V-stem'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const auxVerbOriginalReplaceParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if (token.lexical === Lexicals.AUX_VERB) {
        result[i] = token.original+'AUX-original'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const getParticles = (sentence: Sentence) => {
  let result: string[] = []
  sentence.tokens.forEach((token: WordData) => {
    if (token.lexical === Lexicals.PARTICLE) {
      result.push(token.original)
    } else {
      result.push('')
    }
  })
  return result;
}

