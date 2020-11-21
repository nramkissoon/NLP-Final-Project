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

export const adjCasualParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.I_ADJ || token.lexical === Lexicals.AUX_VERB) && token.inflection === Inflections.DICT) {
        result[i] = token.kanji+'ADJ-casual'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const verbVolStemParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.VERB) && token.inflection === Inflections.VOL_STEM) {
        result[i] = token.kanji+'V-vol-stem'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const verbHypoStemParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.VERB) && token.inflection === Inflections.HYPO_FORM) {
        result[i] = token.kanji+'V-hypo-stem'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const adjHypoStemParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.I_ADJ) && token.inflection === Inflections.HYPO_FORM) {
        result[i] = token.kanji+'ADJ-hypo-stem'
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

export const auxParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if (token.lexical === Lexicals.AUX_VERB) {
        result[i] = token.kanji+'AUX'
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

export const adjNounDictReplaceParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.NOUN) && token.compound2 === Compounds.ADJ_NOUN) {
        result[i] = token.original+'ADJ-N-DICT-FORM'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const adjDictReplaceParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.I_ADJ)) {
        result[i] = token.original+'ADJ-DICT-FORM'
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
      if ((token.lexical === Lexicals.VERB)  && token.kanji === token.original) {
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

export const conjunctionParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.CONJUNCTION) ) {
        result[i] = token.original+'CON'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const preNounAdjParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.PRE_NOUN_ADJ) ) {
        result[i] = token.original+'PRE-N-ADJ'
        wordsLeft[i] = null
      } else {
        result[i] = token.kanji
      }
    }
    i += 1
  })
  return [result, wordsLeft];
}

export const adjDictParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if ((token.lexical === Lexicals.I_ADJ)  && token.kanji === token.original) {
        result[i] = token.original+'ADJ-DICT-FORM'
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

export const adjStemParseChainable = (sentence: Sentence, result: string[], wordsLeft: WordData[]) => {
  let i = 0;
  sentence.tokens.forEach((token: WordData) => {
    if (wordsLeft[i] !== null) {
      if (token.lexical === Lexicals.I_ADJ && (token.kanji === token.original.substring(0, token.original.length - 1))) {
        result[i] = token.original+'ADJ-stem'
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

