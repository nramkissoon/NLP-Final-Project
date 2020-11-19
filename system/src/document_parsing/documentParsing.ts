// Module for parsing documents from the test and dev corpora
import { Sentence, WordData } from './../mecab/mecabOutput';
import { MecabParser } from './../mecab/mecabParser';

export class Document {
  level: number;
  documentText: Sentence[];
  getAllWords = () => {
    const result: WordData[] = [];
    this.documentText.forEach((sentence: Sentence) => {
      sentence.getWordsForWordComplexityComponent().forEach(word => {
        result.push(word);
      })
    });
    return result;
  }
  getAverageSentenceLengthByTokens = () => {
    let totalSent = this.documentText.length
    let totalTokens = 0
    this.documentText.forEach((sentence) => {
      totalTokens += sentence.tokens.length
    })
    return totalTokens / totalSent
  }
  getAverageSentenceLengthByCharacter = () => {
    let totalSent = this.documentText.length
    let totalChars = 0
    this.documentText.forEach((sentence) => {
      totalChars += sentence.getSentence.length
    })
    return totalChars / totalSent
  }
  getTotalSentences = () => {
    return this.documentText.length
  }
}

// return list of Documents
export const splitDocuments = async (corporaText: string) => {
  const documents: Document[] = []
  let lines = corporaText.split('\n');
  let document: Document = new Document();
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
      document.documentText = await splitSentences(line)
    }
  }

  return documents;
}

// return list of Sentences 
export const splitSentences = async (document: string) => {
  const result: Sentence[] = [];
  const mecabParser = new MecabParser();
  document = document.replace(/。/g, '。++');
  let sentences = [];
  let lines = document.split(/\+\+/);
  lines.forEach(line => {
    line = line.replace(/？/g, '？++')
    let newlines = (line.split(/\+\+/))
    newlines.forEach(l => {
      sentences.push(l)
    });
  });
  sentences = sentences.slice(0, sentences.length - 1);
  for (let i = 0; i < sentences.length; i += 1) {
    result.push(new Sentence(await mecabParser.parse(sentences[i])));
  }
  return result;
}