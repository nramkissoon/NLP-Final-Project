'''
Parse raw JLPT kanji data and write kanji lists to system_ready_data files.
'''
import json

def isKanji(character):
    return (ord(character) >= ord('\u4e00')) and (ord(character) <= ord('\u9faf'))

filenames = ["JLPT" + str(i) + "_kanji" for i in range(1, 6)]
for filename in filenames:
    with open('./../../raw_data/JLPT_kanji/' + filename + '.txt', 'r') as raw_data:
        data = raw_data.read().split(' ')
        parsed_data = []
        for element in data:
            if len(element) == 1:
                if isKanji(element):
                    parsed_data.append(element)
        with open('./../../system_ready_data/training_data/JLPT_kanji_lists/' + filename + '.json', 'w') as file:
            json.dump(parsed_data, file, indent=4, ensure_ascii=False)