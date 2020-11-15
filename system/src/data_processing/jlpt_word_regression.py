'''
Created a regression model for predicting the JLPT level of words constaining kanji not officially listed on JLPT.
Record the regression coefficients to a separate file to be read by the main system.
Feature list: Unigram frequenct in BCCWJ, average JLPT of kanji in the word, amount of kanji in the word
'''
import json
import csv
import operator
from sklearn import linear_model

def is_kanji(character):
    return (ord(character) >= ord('\u4e00')) and (ord(character) <= ord('\u9faf'))

def word_contains_kanji(word):
    for character in word:
        if is_kanji(character):
            return True
    return False

# list of officially listed words, their JLPT levels, and other calculated feature data, this list is the training data
training_data = []

word_list_file_to_level_map = {
    "JLPT1.json": 1,
    "JLPT2.json": 2,
    "JLPT3.json": 3,
    "JLPT4.json": 4,
    "JLPT5.json": 5,
}

# JLPT kanji list that maps kanji characters to their respective JLPT level
kanji_to_level_map = {}

kanji_list_file_to_level_map = {
    "JLPT1_kanji.json": 1,
    "JLPT2_kanji.json": 2,
    "JLPT3_kanji.json": 3,
    "JLPT4_kanji.json": 4,
    "JLPT5_kanji.json": 5,
}

# populate kanji_to_level_map
for kanji_list_filename in kanji_list_file_to_level_map:
    with open('./../../system_ready_data/training_data/JLPT_kanji_lists/' + kanji_list_filename, 'r') as file:
        kanji_list = json.load(file)
        for kanji in kanji_list:
            kanji_to_level_map[kanji] = kanji_list_file_to_level_map[kanji_list_filename]

# load in BCCWJ unigram frequency data
word_freq_data = {} # map word to its unigram frequency

with open('./../../system_ready_data/training_data/BCCWJ_frequency_list.txt', 'r') as file:
    data = csv.reader(file, delimiter='\t')
    for row in data:
        word_freq_data[row[0]] = int(row[1])

# load in officially listed words
official_word_list = {}

for word_list_filename in  word_list_file_to_level_map:
    level = word_list_file_to_level_map[word_list_filename]
    with open('./../../system_ready_data/training_data/JLPT_word_lists/' + word_list_filename, 'r') as file:
        word_list = json.load(file)
        for word in word_list:
            if word_contains_kanji(word):
                official_word_list[word] = level

# create training data ------------------------------------

def calculate_avg_kanji_level(word):
    if not word_contains_kanji(word):
        return 5 # easiest JLPT level
    else:
        num_kanji = 0
        total = 0
        for character in word:
            if is_kanji(character):
                num_kanji += 1
                if character in kanji_to_level_map:
                    total += kanji_to_level_map[character]
                else: # not even listed
                    total += 0 # assign 'hardest' difficulty
        return total / num_kanji

def calculate_mode_kanji_level(word):
    if not word_contains_kanji(word):
        return 5 # easiest JLPT level
    else:
        levels = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        for character in word:
            if is_kanji(character):
                if character in kanji_to_level_map:
                    levels[kanji_to_level_map[character]] += 1
                else:
                    levels[0] += 1
        return max(levels.items(), key=operator.itemgetter(1))[0] 

def get_hardest_kanji_level(word):
    if not word_contains_kanji(word):
        return 5 # easiest JLPT level
    else:
        level = 5
        for character in word:
            if is_kanji(character):
                if character in kanji_to_level_map:
                    level = min(level, kanji_to_level_map[character])
                else:
                    level = 0
        return level

def get_easiest_kanji_level(word):
    if not word_contains_kanji(word):
        return 5 # easiest JLPT level
    else:
        level = 0
        for character in word:
            if is_kanji(character):
                if character in kanji_to_level_map:
                    level = max(level, kanji_to_level_map[character])
        return level


def get_num_kanji(word):
    total = 0
    for character in word:
        if is_kanji(character):
            total += 1
    return total

def get_unigram_freq(word):
    if word not in word_freq_data:
        return 0
    return word_freq_data[word]

for word in official_word_list:
    features = [None] * 4
    features[0] = official_word_list[word]
    #features[1] = get_num_kanji(word)
    features[1] = get_unigram_freq(word)
    #features[2] = calculate_avg_kanji_level(word)
    features[2] = calculate_mode_kanji_level(word)
    features[3] = get_hardest_kanji_level(word)
    #features[5] = get_easiest_kanji_level(word)
    training_data.append(features)

print('Creating word JLPT level predictor linear regression model...')

model = linear_model.LinearRegression(fit_intercept=False) # if all our features = 0, we expect the JLPT level to be 0
model.fit([training_data[i][1::] for i in range(len(training_data))], [training_data[i][0] for i in range(len(training_data))])

print('Writing model coefficients to system_ready_data/word_regression.txt...')
print(model.coef_)

with open('./../../system_ready_data/word_regression.txt', 'w') as file:
    coefs = model.coef_
    file.write('unigram_freq\t' + str(coefs[0]) + '\n')
    file.write('mode_kanji_level\t' + str(coefs[1]) + '\n')
    file.write('hardest_kanji_level\t' + str(coefs[2]) + '\n')

print('Regression model successfully created and written to file.')