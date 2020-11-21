import { MecabParser } from './../mecab/mecabParser';
import { Sentence } from './../mecab/mecabOutput';

const level5 = [
  //'この話をしたのは鈴木様にだけではない。',
  //'欠けているものはひとつだけ、客だった。',
  //'ずっとに待っていたんだけど、我慢できなくなって夕ごはんは先に食べちゃったわ。',
  //'いつもスマホを見てるけど、何をチェックしてるの？',
  //'そろそろ帰ったほうがいいみたいね。',
  //'ここで事をおこすと、全国の新聞が騒ぎたて、警察や、場合によっては軍隊をも動かすことになると思う。',
  //'赤くなくって、綺麗な人。',
  //'わたしはしょうらい医者になるつもりです',
  '先生によると、今度の期末試験は難しかったそうです。',
  '先生によると、今度の期末試験は難しいそうです。',
  'わたしが知っているのは、どちらにしろ手も足も出せないということだけだ。',
  '罰せられずに済んでしまう犯罪って、たくさんありますか？それともありませんか？'
]

export const parseTestSentences = async () => {
  const sentences: Sentence[] = [];
  const parser = new MecabParser();
  for (let sentence of level5) {
    sentences.push(new Sentence(await parser.parse(sentence)));
  }
  return sentences;
}