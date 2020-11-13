import MeCab from 'mecab-async';

export class MecabParser {
  #mecab: { options: { }, parse };

  constructor() {
    this.#mecab = MeCab
    this.#mecab.options = {
      maxBuffer: 300 * 1024 * 8
    };
  }

  parse = async (text: string) => {
    const promise: string[][] = await new Promise<string[][]>((resolve, reject) => {
      this.#mecab.parse(text, (err: Error, result: string[][]) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      });
    }).then(result => result)
      .catch(err => {
        return null;
      });
    return promise;
  }
}