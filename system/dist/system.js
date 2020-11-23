"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCorpusText = exports.devCorpusText = exports.trainCorpusText = exports.jlptWordRegression = exports.jlptWordLists = void 0;
const parsingTesting_1 = require("./dev_utils/parsingTesting");
const wordRegression_1 = require("./regression/wordRegression");
const documentParsing_1 = require("./document_parsing/documentParsing");
const averageWordJLPT_1 = require("./baselines/averageWordJLPT");
const hardestWord_1 = require("./baselines/hardestWord");
const wordTFIDF_1 = require("./tfidf/wordTFIDF");
const wordQueryVector_1 = require("./tfidf/wordQueryVector");
const tfidf_1 = require("./tfidf/tfidf");
const outputWriting_1 = require("./baselines/output_writing/outputWriting");
const wordLevelDistribution_1 = require("./training/wordLevelDistribution");
const grammar_parser_1 = require("./grammar_parsing/grammar_parser");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load grammar regexes
const jlpt5grammar = [];
let grammar5 = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_grammar_lists/JLPT5.json')).toString());
grammar5.forEach((grammarObj) => {
    jlpt5grammar.push(new grammar_parser_1.GrammarParser(grammarObj.regex, grammarObj.id, 5, grammarObj.parseStrategies));
});
const jlpt4grammar = [];
let grammar4 = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_grammar_lists/JLPT4.json')).toString());
grammar4.forEach((grammarObj) => {
    jlpt4grammar.push(new grammar_parser_1.GrammarParser(grammarObj.regex, grammarObj.id, 4, grammarObj.parseStrategies));
});
const jlpt3grammar = [];
let grammar3 = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_grammar_lists/JLPT3.json')).toString());
grammar3.forEach((grammarObj) => {
    jlpt3grammar.push(new grammar_parser_1.GrammarParser(grammarObj.regex, grammarObj.id, 3, grammarObj.parseStrategies));
});
const jlpt2grammar = [];
let grammar2 = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_grammar_lists/JLPT2.json')).toString());
grammar2.forEach((grammarObj) => {
    jlpt2grammar.push(new grammar_parser_1.GrammarParser(grammarObj.regex, grammarObj.id, 2, grammarObj.parseStrategies));
});
const jlpt1grammar = [];
let grammar1 = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_grammar_lists/JLPT1.json')).toString());
grammar1.forEach((grammarObj) => {
    jlpt1grammar.push(new grammar_parser_1.GrammarParser(grammarObj.regex, grammarObj.id, 1, grammarObj.parseStrategies));
});
const jlptGrammarLists = {
    1: jlpt1grammar,
    2: jlpt2grammar,
    3: jlpt3grammar,
    4: jlpt4grammar,
    5: jlpt5grammar,
};
// Load in JLPT word list data
exports.jlptWordLists = {
    lists: []
};
exports.jlptWordLists.lists[0] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT1.json')).toString()));
exports.jlptWordLists.lists[1] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT2.json')).toString()));
exports.jlptWordLists.lists[2] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT3.json')).toString()));
exports.jlptWordLists.lists[3] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT4.json')).toString()));
exports.jlptWordLists.lists[4] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_word_lists/JLPT5.json')).toString()));
// Load in JLPT Kanji list data
const jlptKanjiLists = {
    lists: []
};
jlptKanjiLists.lists[0] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT1_kanji.json')).toString()));
jlptKanjiLists.lists[1] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT2_kanji.json')).toString()));
jlptKanjiLists.lists[2] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT3_kanji.json')).toString()));
jlptKanjiLists.lists[3] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT4_kanji.json')).toString()));
jlptKanjiLists.lists[4] = new Set(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/JLPT_kanji_lists/JLPT5_kanji.json')).toString()));
// Load in Unigram Frequency data
const unigramFreqList = {
    words: {}
};
let unigramFreqFileLines = [];
let text = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_data/BCCWJ_frequency_list.txt')).toString();
unigramFreqFileLines = text.split('\n');
unigramFreqFileLines.forEach((line) => {
    let data = line.split('\t');
    unigramFreqList.words[data[0]] = parseInt(data[1]);
});
// Load in word regression coefficients
let unigramFreqCoef = 0;
let hardestKanjiCoef = 0;
let modeKanjiLevelCoef = 0;
text = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/word_regression.txt')).toString();
let coefficientFileLines = text.split('\n');
coefficientFileLines.forEach((line) => {
    let data = line.split('\t');
    switch (data[0]) {
        case 'unigram_freq':
            unigramFreqCoef = parseFloat(data[1]);
            break;
        case 'mode_kanji_level':
            modeKanjiLevelCoef = parseFloat(data[1]);
            break;
        case 'hardest_kanji_level':
            hardestKanjiCoef = parseFloat(data[1]);
            break;
        default:
            break;
    }
});
// Build the JLPT word regression model
exports.jlptWordRegression = new wordRegression_1.JLPTWordRegression(jlptKanjiLists, unigramFreqList, unigramFreqCoef, modeKanjiLevelCoef, hardestKanjiCoef);
//Read in the training corpus
exports.trainCorpusText = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/training_corpus.txt')).toString();
// Read in the development corpus
exports.devCorpusText = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/development_corpus.txt')).toString();
// Read in the test corpus
exports.testCorpusText = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../system_ready_data/test_corpus.txt')).toString();
const devCorpus = documentParsing_1.splitDocuments(exports.devCorpusText);
const testCorpus = documentParsing_1.splitDocuments(exports.testCorpusText);
const trainCorpus = documentParsing_1.splitDocuments(exports.trainCorpusText);
// run the system
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const sentences = yield parsingTesting_1.parseTestSentences();
    sentences.forEach((sentence) => {
        jlpt1grammar.forEach((parser) => {
            console.log(parser.parse(sentence));
        });
        sentence.tokens.forEach((token) => {
            console.log(token.kanji + ': ' + token.original + ': ' + token.lexical + ': ' + token.inflection + ': ' + token.compound + ': ' + token.compound2 + ': ' + token.compound3);
        });
    });
    console.log('Running Average Word JLPT BaseLine...');
    const AverageWordJLPTBaselineResults = averageWordJLPT_1.runAverageWordJLPTBaseline(exports.jlptWordLists.lists[4], exports.jlptWordLists.lists[3], exports.jlptWordLists.lists[2], exports.jlptWordLists.lists[1], exports.jlptWordLists.lists[0], exports.jlptWordRegression, yield testCorpus);
    let file = fs_1.default.createWriteStream(path_1.default.join(__dirname + '/../src/baselines/baseline_outputs.txt/average_word_JLPT_baseline.txt'));
    AverageWordJLPTBaselineResults.forEach((prediction) => {
        file.write(prediction.toString() + '\n');
    });
    console.log('Running Hardest Word JLPT Baseline...');
    const HardestWordBaselineResults = hardestWord_1.runHardestWordBaseline(exports.jlptWordLists.lists[4], exports.jlptWordLists.lists[3], exports.jlptWordLists.lists[2], exports.jlptWordLists.lists[1], exports.jlptWordLists.lists[0], exports.jlptWordRegression, yield testCorpus);
    file = fs_1.default.createWriteStream(path_1.default.join(__dirname + '/../src/baselines/baseline_outputs.txt/hardest_word_baseline.txt'));
    HardestWordBaselineResults.forEach((prediction) => {
        file.write(prediction.toString() + '\n');
    });
    console.log('Running Highest Cosine Similarity - Non Augmented Word Complexity Only...');
    let tfidfs = (wordTFIDF_1.getWordTFIDFVectorsForDocuments(yield testCorpus));
    let idfs = (wordTFIDF_1.getWordIdfScoresFromDocs(yield testCorpus));
    let queries = wordQueryVector_1.createJLPTWordQueryVectors(exports.jlptWordLists.lists, idfs);
    let predictions = outputWriting_1.getMostCosineSimilar(tfidf_1.calculateCosSimilarityForEachDocForEachQuery(tfidfs, queries));
    file = fs_1.default.createWriteStream(path_1.default.join(__dirname + '/../src/baselines/baseline_outputs.txt/word_complexity_non_augmented.txt'));
    predictions.forEach((prediction) => {
        file.write(prediction.toString() + '\n');
    });
    console.log('Running Highest Cosine Similarity - Augmented Word Complexity...');
    let augmentedQueries = wordQueryVector_1.augmentJLPTWordQueryVectors(queries, exports.jlptWordLists.lists, idfs, exports.jlptWordRegression);
    predictions = outputWriting_1.getMostCosineSimilar(tfidf_1.calculateCosSimilarityForEachDocForEachQuery(tfidfs, augmentedQueries));
    file = fs_1.default.createWriteStream(path_1.default.join(__dirname + '/../src/baselines/baseline_outputs.txt/word_complexity_augmented.txt'));
    predictions.forEach((prediction) => {
        file.write(prediction.toString() + '\n');
    });
    console.log('Calculating Word Level Distributions in Training, Dev, and Test Corpora...');
    let trainWordLevelDistributions = JSON.stringify(wordLevelDistribution_1.calculateWordLevelDsitributionForEachDocument(yield trainCorpus, exports.jlptWordLists.lists[0], exports.jlptWordLists.lists[1], exports.jlptWordLists.lists[2], exports.jlptWordLists.lists[3], exports.jlptWordLists.lists[4], exports.jlptWordRegression));
    fs_1.default.writeFileSync(path_1.default.join(__dirname + '/../system_ready_data/word_level_distribution_svm/train_features.json'), trainWordLevelDistributions);
    let devWordLevelDistributions = JSON.stringify(wordLevelDistribution_1.calculateWordLevelDsitributionForEachDocument(yield devCorpus, exports.jlptWordLists.lists[0], exports.jlptWordLists.lists[1], exports.jlptWordLists.lists[2], exports.jlptWordLists.lists[3], exports.jlptWordLists.lists[4], exports.jlptWordRegression));
    fs_1.default.writeFileSync(path_1.default.join(__dirname + '/../system_ready_data/word_level_distribution_svm/dev_features.json'), devWordLevelDistributions);
    let testWordLevelDistributions = JSON.stringify(wordLevelDistribution_1.calculateWordLevelDsitributionForEachDocument(yield testCorpus, exports.jlptWordLists.lists[0], exports.jlptWordLists.lists[1], exports.jlptWordLists.lists[2], exports.jlptWordLists.lists[3], exports.jlptWordLists.lists[4], exports.jlptWordRegression));
    fs_1.default.writeFileSync(path_1.default.join(__dirname + '/../system_ready_data/word_level_distribution_svm/test_features.json'), testWordLevelDistributions);
    //write grammar level feature data
    // console.log("Parsing Training Corpus for grammar structures...")
    // let trainGrammarLevelDistributions = JSON.stringify(calculateGrammarLevelDistributionFeaturesForEachDocument(await trainCorpus, jlptGrammarLists))
    // fs.writeFileSync(path.join(__dirname + '/../system_ready_data/grammar_level_distribution_svm/train_features.json'), trainGrammarLevelDistributions);
    // console.log("Parsing Dev Corpus for grammar structures...")
    // let devGrammarLevelDistributions = JSON.stringify(calculateGrammarLevelDistributionFeaturesForEachDocument(await devCorpus, jlptGrammarLists))
    // fs.writeFileSync(path.join(__dirname + '/../system_ready_data/grammar_level_distribution_svm/dev_features.json'), devGrammarLevelDistributions);
    // console.log("Parsing Test Corpus for grammar structures...")
    // let testGrammarLevelDistributions = JSON.stringify(calculateGrammarLevelDistributionFeaturesForEachDocument(await testCorpus, jlptGrammarLists))
    // fs.writeFileSync(path.join(__dirname + '/../system_ready_data/grammar_level_distribution_svm/test_features.json'), testGrammarLevelDistributions);
});
run();
//# sourceMappingURL=system.js.map