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
exports.parseTestSentences = void 0;
const mecabParser_1 = require("./../mecab/mecabParser");
const mecabOutput_1 = require("./../mecab/mecabOutput");
const level5 = [
    //'この話をしたのは鈴木様にだけではない。',
    //'欠けているものはひとつだけ、客だった。',
    //'ずっとに待っていたんだけど、我慢できなくなって夕ごはんは先に食べちゃったわ。',
    //'いつもスマホを見てるけど、何をチェックしてるの？',
    //'そろそろ帰ったほうがいいみたいね。',
    //'ここで事をおこすと、全国の新聞が騒ぎたて、警察や、場合によっては軍隊をも動かすことになると思う。',
    //'赤くなくって、綺麗な人。',
    //'わたしはしょうらい医者になるつもりです',
    'あと二歩進んだら、目をあけてもいいぞ。',
    '木を彫るほうが、石よりずっと簡単だ。',
    '人より牛のほうが多い。'
];
exports.parseTestSentences = () => __awaiter(void 0, void 0, void 0, function* () {
    const sentences = [];
    const parser = new mecabParser_1.MecabParser();
    for (let sentence of level5) {
        sentences.push(new mecabOutput_1.Sentence(yield parser.parse(sentence)));
    }
    return sentences;
});
//# sourceMappingURL=parsingTesting.js.map