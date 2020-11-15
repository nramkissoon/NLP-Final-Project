import { parseTestSentences } from './dev_utils/parsingTesting';
import { Sentence } from './mecab/mecabOutput';
import { JLPTKanjiLists, UnigramFreqList, JLPTWordRegression } from './regression/wordRegression'
import { splitDocuments, splitSentences } from './document_parsing/documentParsing'
import  { runAverageWordJLPTBaseline } from './baselines/averageWordJLPT'
import fs from 'fs';
import path from 'path';

// Load in JLPT word list data
export const jlptWordLists = {
  lists: []
}

jlptWordLists.lists[0] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT1.json')).toString()));
jlptWordLists.lists[1] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT2.json')).toString()));
jlptWordLists.lists[2] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT3.json')).toString()));
jlptWordLists.lists[3] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT4.json')).toString()));
jlptWordLists.lists[4] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT5.json')).toString()));

// Load in JLPT Kanji list data
const jlptKanjiLists: JLPTKanjiLists = {
  lists: []
}

jlptKanjiLists.lists[0] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT1_kanji.json')).toString()));
jlptKanjiLists.lists[1] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT2_kanji.json')).toString()));
jlptKanjiLists.lists[2] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT3_kanji.json')).toString()));
jlptKanjiLists.lists[3] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT4_kanji.json')).toString()));
jlptKanjiLists.lists[4] = new Set<string>(JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT5_kanji.json')).toString()));

// Load in Unigram Frequency data
const unigramFreqList: UnigramFreqList = {
  words: {}
}

let unigramFreqFileLines = [];
let text = fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/BCCWJ_frequency_list.txt')).toString();
unigramFreqFileLines = text.split('\n');
unigramFreqFileLines.forEach((line: string) => {
  let data = line.split('\t');
  unigramFreqList.words[data[0]] = parseInt(data[1]);
});

// Load in word regression coefficients
let unigramFreqCoef: number = 0;
let hardestKanjiCoef: number = 0;
let modeKanjiLevelCoef: number = 0;

text = fs.readFileSync(path.join(__dirname + '/../system_ready_data/word_regression.txt')).toString();
let coefficientFileLines = text.split('\n');
coefficientFileLines.forEach((line: string) => {
  let data = line.split('\t');
  switch (data[0]) {
    case 'unigram_freq':
      unigramFreqCoef = parseFloat(data[1])
      break;
    case 'mode_kanji_level':
      modeKanjiLevelCoef = parseFloat(data[1])
      break
    case 'hardest_kanji_level':
      hardestKanjiCoef = parseFloat(data[1])
      break
    default:
      break;
  }
});

// Build the JLPT word regression model
export const jlptWordRegression: JLPTWordRegression = new JLPTWordRegression(
  jlptKanjiLists, unigramFreqList, unigramFreqCoef, modeKanjiLevelCoef, hardestKanjiCoef
)

// Read in the development corpus
export const devCorpusText: string = fs.readFileSync(path.join(__dirname + '/../system_ready_data/development_corpus.txt')).toString()
// Read in the test corpus
export const testCorpusText: string = fs.readFileSync(path.join(__dirname + '/../system_ready_data/test_corpus.txt')).toString()

const devCorpus = splitDocuments(devCorpusText)
const testCorpus = splitDocuments(testCorpusText)

// run the system
const run = async () => {
  const sentences: Sentence[] = await parseTestSentences();
  sentences.forEach((sentence) => {
    sentence.tokens.forEach((token) => {
      //console.log(token.original + ': ' + token.lexical + ': ' + token.compound + ': ' + token.compound2 + ': ' + token.compound3)
    })
  })

  const AverageWordJLPTBaselineResults = runAverageWordJLPTBaseline(
    jlptWordLists.lists[4],
    jlptWordLists.lists[3],
    jlptWordLists.lists[2],
    jlptWordLists.lists[1],
    jlptWordLists.lists[0],
    jlptWordRegression,
    await testCorpus
  )
  let file = fs.createWriteStream(path.join(__dirname + '/baselines/baseline_outputs.txt/average_word_JLPT_baseline.txt'));
  AverageWordJLPTBaselineResults.forEach((prediction) => {
    file.write(prediction.toString() + '\n');
  });
}

run()