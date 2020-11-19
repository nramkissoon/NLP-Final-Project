import { Sentence } from './../mecab/mecabOutput'
import {
  originalParse,
  vCasualParse,
  nounParseChainable, particleParseChainable, getParticles, adverbParseChainable,
  verbNegativeStemParseChainable,
  nadjParseChainable,
  adjTeStemParseChainable,
  verbDictReplaceParseChainable,
  verbStemParseChainable,
  verbCasualParseChainable,
  verbDictParseChainable,
  auxVerbOriginalReplaceParseChainable
} from './sentenceParse'

export const parseStrategies = {
  ORIGINAL: 'original',
  NONE: 'none',
  VCASUAL: 'V-casual',
  NOUN: 'N',
  PARTICLE: 'P',
  PMATCH: 'P-match',
  ADVERB: 'ADV',
  VNEGSTEM: 'V-neg-stem',
  VDICTREPLACE: 'V-dict-replace',
  NADJ: 'NADJ',
  ADJTESTEM: 'ADJ-te-stem',
  VSTEM: 'V-stem',
  VDICT: 'V-dict',
  AUXVERBORIGINALREPLACE: 'AUX-original-replace'
}

export const chainParsing = (strategies: string[], sentence: Sentence) => {
  if (strategies[0] === parseStrategies.NONE && strategies.length === 1) {
    return sentence.getSentence();
  } else if (strategies[0] === parseStrategies.ORIGINAL && strategies.length === 1) {
    return originalParse(sentence).join('')
  } else if (strategies[0] === parseStrategies.PMATCH && strategies.length === 1){
    return getParticles(sentence).join('')
  } else if (strategies.length === 1 && strategies[0] === parseStrategies.VCASUAL) {
    return vCasualParse(sentence).join('')
  } else {
    let words = Array.from(sentence.tokens);
    let result = new Array(words.length);
    for (let i = 0; i < result.length; i += 1){
      result[i] = '';
    }
    strategies.forEach((strategy) => {
      let r = []
      if (strategy === parseStrategies.NOUN) {
        r = nounParseChainable(sentence, result, words);
      } else if (strategy === parseStrategies.PARTICLE) {
        r = particleParseChainable(sentence, result, words);
      } else if (strategy === parseStrategies.ADVERB) {
        r = adverbParseChainable(sentence, result, words);
      } else if (strategy === parseStrategies.VNEGSTEM) {
        r = verbNegativeStemParseChainable(sentence, result, words);
      } else if (strategy === parseStrategies.VDICTREPLACE) {
        r = verbDictReplaceParseChainable(sentence, result, words);
      } else if (strategy === parseStrategies.NADJ) {
        r = nadjParseChainable(sentence, result, words);
      }else if (strategy === parseStrategies.ADJTESTEM) {
        r = adjTeStemParseChainable(sentence, result, words);
      } else if (strategy === parseStrategies.VSTEM) {
        r = verbStemParseChainable(sentence, result, words);
      } else if (strategy === parseStrategies.VCASUAL) {
        r = verbCasualParseChainable(sentence, result, words);
      }else if (strategy === parseStrategies.VDICT) {
        r = verbDictParseChainable(sentence, result, words);
      }else if (strategy === parseStrategies.AUXVERBORIGINALREPLACE) {
        r = auxVerbOriginalReplaceParseChainable(sentence, result, words);
      }
      words = r[1];
      result = r[0];
    });
    console.log(result.join(""))
    return result.join('')
  }
}

export class GrammarParser {
  regexes: RegExp[] = []
  id: string = ""
  parseStrategies: string[][]
  level: number

  constructor(regexes: string[], id: string, level: number, parseStrategies: string[][]) {
    regexes.forEach((val) => {

      let regex = new RegExp(val, 'g')
      this.regexes.push(regex);
    })
    this.id = id;
    this.level = level;
    this.parseStrategies = parseStrategies;
  }

  //return number of occurences of grammar in sentence
  parse = (sentence: Sentence) => {
    let count = 0;
    for (let i = 0; i < this.parseStrategies.length; i += 1) {
      let regex = this.regexes[i];
      let parsedSentence = chainParsing(this.parseStrategies[i], sentence);
      if (parsedSentence.match(regex)) {
        count += parsedSentence.match(regex).length
      }
    }
    return count
  }
}