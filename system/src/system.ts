import { parseTestSentences } from './dev_utils/parsingTesting';
import { Sentence } from './mecab/mecabOutput';
import { JLPTKanjiLists, UnigramFreqList, JLPTWordRegression } from './regression/wordRegression'
import { splitDocuments, splitSentences } from './document_parsing/documentParsing'
import { runAverageWordJLPTBaseline } from './baselines/averageWordJLPT'
import { runHardestWordBaseline } from './baselines/hardestWord'
import { getWordTFIDFVectorsForDocuments, getWordIdfScoresFromDocs } from './tfidf/wordTFIDF'
import { createJLPTWordQueryVectors, augmentJLPTWordQueryVectors } from './tfidf/wordQueryVector'
import { calculateCosSimilarityForEachDocForEachQuery } from './tfidf/tfidf'
import { getMostCosineSimilar } from './baselines/output_writing/outputWriting'
import { calculateWordLevelDsitributionForEachDocument } from './training/wordLevelDistribution'
import { GrammarParser } from './grammar_parsing/grammar_parser'
import fs from 'fs';
import path from 'path';

// Load grammar regexes
const jlpt5grammar: GrammarParser[] = [];
let grammar5: any[] = JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_grammar_lists/JLPT5.json')).toString());
grammar5.forEach((grammarObj) => {
  jlpt5grammar.push(new GrammarParser(grammarObj.regex, grammarObj.id, 5, grammarObj.parseStrategies))
})
const jlpt4grammar: GrammarParser[] = [];
let grammar4: any[] = JSON.parse(fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_data/JLPT_grammar_lists/JLPT4.json')).toString());
grammar4.forEach((grammarObj) => {
  jlpt4grammar.push(new GrammarParser(grammarObj.regex, grammarObj.id, 4, grammarObj.parseStrategies))
})


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

//Read in the training corpus
export const trainCorpusText: string = fs.readFileSync(path.join(__dirname + '/../system_ready_data/training_corpus.txt')).toString()
// Read in the development corpus
export const devCorpusText: string = fs.readFileSync(path.join(__dirname + '/../system_ready_data/development_corpus.txt')).toString()
// Read in the test corpus
export const testCorpusText: string = fs.readFileSync(path.join(__dirname + '/../system_ready_data/test_corpus.txt')).toString()

const devCorpus = splitDocuments(devCorpusText)
const testCorpus = splitDocuments(testCorpusText)
const trainCorpus = splitDocuments(trainCorpusText)

// run the system
const run = async () => {
  const sentences: Sentence[] = await parseTestSentences();
  sentences.forEach((sentence) => {
    jlpt4grammar.forEach((parser) => {
      console.log(parser.parse(sentence))
    })
    sentence.tokens.forEach((token) => {
      console.log(token.kanji + ': ' + token.original + ': '+ token.lexical + ': '+ token.inflection + ': ' + token.compound + ': ' + token.compound2 + ': ' + token.compound3)
    })
  })

  console.log('Running Average Word JLPT BaseLine...')
  const AverageWordJLPTBaselineResults = runAverageWordJLPTBaseline(
    jlptWordLists.lists[4],
    jlptWordLists.lists[3],
    jlptWordLists.lists[2],
    jlptWordLists.lists[1],
    jlptWordLists.lists[0],
    jlptWordRegression,
    await testCorpus
  )
  let file = fs.createWriteStream(path.join(__dirname + '/../src/baselines/baseline_outputs.txt/average_word_JLPT_baseline.txt'));
  AverageWordJLPTBaselineResults.forEach((prediction) => {
    file.write(prediction.toString() + '\n');
  });

  console.log('Running Hardest Word JLPT Baseline...')
  const HardestWordBaselineResults = runHardestWordBaseline(
    jlptWordLists.lists[4],
    jlptWordLists.lists[3],
    jlptWordLists.lists[2],
    jlptWordLists.lists[1],
    jlptWordLists.lists[0],
    jlptWordRegression,
    await testCorpus
  )
  file = fs.createWriteStream(path.join(__dirname + '/../src/baselines/baseline_outputs.txt/hardest_word_baseline.txt'));
  HardestWordBaselineResults.forEach((prediction) => {
    file.write(prediction.toString() + '\n');
  });

  console.log('Running Highest Cosine Similarity - Non Augmented Word Complexity Only...')
  let tfidfs = (getWordTFIDFVectorsForDocuments(await testCorpus))
  let idfs = (getWordIdfScoresFromDocs( await testCorpus))
  let queries = createJLPTWordQueryVectors(jlptWordLists.lists, idfs)
  let predictions = getMostCosineSimilar(calculateCosSimilarityForEachDocForEachQuery(tfidfs, queries))
  file = fs.createWriteStream(path.join(__dirname + '/../src/baselines/baseline_outputs.txt/word_complexity_non_augmented.txt'));
  predictions.forEach((prediction) => {
    file.write(prediction.toString() + '\n');
  });

  console.log('Running Highest Cosine Similarity - Augmented Word Complexity...')
  let augmentedQueries = augmentJLPTWordQueryVectors(queries, jlptWordLists.lists, idfs, jlptWordRegression)
  predictions = getMostCosineSimilar(calculateCosSimilarityForEachDocForEachQuery(tfidfs, augmentedQueries))
  file = fs.createWriteStream(path.join(__dirname + '/../src/baselines/baseline_outputs.txt/word_complexity_augmented.txt'));
  predictions.forEach((prediction) => {
    file.write(prediction.toString() + '\n');
  });

  console.log('Calculating Word Level Distributions in Training, Dev, and Test Corpora...')

  let trainWordLevelDistributions = JSON.stringify(calculateWordLevelDsitributionForEachDocument(await trainCorpus,
    jlptWordLists.lists[0],
    jlptWordLists.lists[1],
    jlptWordLists.lists[2],
    jlptWordLists.lists[3],
    jlptWordLists.lists[4],
    jlptWordRegression));
  fs.writeFileSync(path.join(__dirname + '/../system_ready_data/word_level_distribution_svm/train_features.json'), trainWordLevelDistributions);

  let devWordLevelDistributions = JSON.stringify(calculateWordLevelDsitributionForEachDocument(await devCorpus,
    jlptWordLists.lists[0],
    jlptWordLists.lists[1],
    jlptWordLists.lists[2],
    jlptWordLists.lists[3],
    jlptWordLists.lists[4],
    jlptWordRegression));
  fs.writeFileSync(path.join(__dirname + '/../system_ready_data/word_level_distribution_svm/dev_features.json'), devWordLevelDistributions);

  let testWordLevelDistributions = JSON.stringify(calculateWordLevelDsitributionForEachDocument(await testCorpus,
    jlptWordLists.lists[0],
    jlptWordLists.lists[1],
    jlptWordLists.lists[2],
    jlptWordLists.lists[3],
    jlptWordLists.lists[4],
    jlptWordRegression));
  fs.writeFileSync(path.join(__dirname + '/../system_ready_data/word_level_distribution_svm/test_features.json'), testWordLevelDistributions);

  
}

run()
