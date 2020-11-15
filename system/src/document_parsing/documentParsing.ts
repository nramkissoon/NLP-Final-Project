// Module for parsing documents from the test and dev corpora
import { Sentence } from './../mecab/mecabOutput';
import { MecabParser } from './../mecab/mecabParser';

export interface Document {
  level: number;
  documentText: Sentence[];
}

// return list of Documents
export const splitDocuments = async (corporaText: string) => {
  const documents: Document[] = []
  let lines = corporaText.split('\n');
  let document: Document = { level: null, documentText: null };
  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i];
    if (line === '') {
      if (document.level && document.documentText) {
        documents.push(document);
        document = { level: null, documentText: null };
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