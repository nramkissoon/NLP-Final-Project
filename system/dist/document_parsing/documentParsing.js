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
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitSentences = exports.splitDocuments = exports.Document = void 0;
// Module for parsing documents from the test and dev corpora
const mecabOutput_1 = require("./../mecab/mecabOutput");
const mecabParser_1 = require("./../mecab/mecabParser");
class Document {
    constructor() {
        this.getAllWords = () => {
            const result = [];
            this.documentText.forEach((sentence) => {
                sentence.getWordsForWordComplexityComponent().forEach(word => {
                    result.push(word);
                });
            });
            return result;
        };
        this.getAverageSentenceLengthByTokens = () => {
            let totalSent = this.documentText.length;
            let totalTokens = 0;
            this.documentText.forEach((sentence) => {
                totalTokens += sentence.tokens.length;
            });
            return totalTokens / totalSent;
        };
        this.getAverageSentenceLengthByCharacter = () => {
            let totalSent = this.documentText.length;
            let totalChars = 0;
            this.documentText.forEach((sentence) => {
                totalChars += sentence.getSentence.length;
            });
            return totalChars / totalSent;
        };
        this.getTotalSentences = () => {
            return this.documentText.length;
        };
    }
}
exports.Document = Document;
// return list of Documents
exports.splitDocuments = (corporaText) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = [];
    let lines = corporaText.split('\n');
    let document = new Document();
    for (let i = 0; i < lines.length; i += 1) {
        let line = lines[i];
        if (line === '') {
            if (document.level && document.documentText) {
                documents.push(document);
                document = new Document();
            }
        }
        else if (line.length === 1) {
            let level = parseInt(line);
            document.level = level;
        }
        else if (line.length > 1) {
            document.documentText = yield exports.splitSentences(line);
        }
    }
    return documents;
});
// return list of Sentences 
exports.splitSentences = (document) => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    const mecabParser = new mecabParser_1.MecabParser();
    document = document.replace(/。/g, '。++');
    let sentences = [];
    let lines = document.split(/\+\+/);
    lines.forEach(line => {
        line = line.replace(/？/g, '？++');
        let newlines = (line.split(/\+\+/));
        newlines.forEach(l => {
            sentences.push(l);
        });
    });
    sentences = sentences.slice(0, sentences.length - 1);
    for (let i = 0; i < sentences.length; i += 1) {
        result.push(new mecabOutput_1.Sentence(yield mecabParser.parse(sentences[i])));
    }
    return result;
});
//# sourceMappingURL=documentParsing.js.map