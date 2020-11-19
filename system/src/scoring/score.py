import sys

def calculate_accuracy(output: list, answer_key: list):
    correct = 0
    total = len(output)
    assert(len(output) == len(answer_key))
    for i in range(len(output)):
        if output[i] == answer_key[i]:
            correct+=1
    return correct / total

def calculate_within_adj_accuracy(output: list, answer_key: list):
    correct = 0
    total = len(output)
    assert(len(output) == len(answer_key))
    for i in range(len(output)):
        if output[i] in range(answer_key[i] - 1 , answer_key[i] + 2):
            correct+=1
    return correct / total

def calculate_level_accuracy(output: list, answer_key: list, level: int):
    correct = 0
    total = 0
    assert(len(output) == len(answer_key))
    for i in range(len(output)):
        if output[i] == answer_key[i] and answer_key[i] == level:
            correct+=1
            total += 1
        elif answer_key[i] == level:
            total += 1
    return correct / total

def get_level_confusion_results(output: list, answer_key: list, level: int):
    assert(len(output) == len(answer_key))
    results = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for i in range(len(output)):
        if answer_key[i] == level:
            results[output[i]] += 1
    return results

def convert_output_to_int(output: list):
    converted_output = []
    for i in output:
        if i <= 1.5:
            converted_output.append(1)
        elif i <= 2.5:
            converted_output.append(2)
        elif i <= 3.5:
            converted_output.append(3)
        elif i <= 4.5:
            converted_output.append(4)
        else:
            converted_output.append(5)
    return converted_output

def get_output_from_file(filename):
    output = []
    with open(filename, 'r') as file:
        lines = file.readlines()
        for line in lines:
            output.append(float(line.strip()))
    return output

def get_answers_from_test_corpus():
    output = []
    with open('./../../system_ready_data/test_corpus.txt', 'r') as file:
        lines = file.readlines()
        for line in lines:
            if len(line.strip()) == 1:
                output.append(int(line))
    return output

def get_answers_from_dev_corpus():
    output = []
    with open('./../../system_ready_data/development_corpus.txt', 'r') as file:
        lines = file.readlines()
        for line in lines:
            if len(line.strip()) == 1:
                output.append(int(line))
    return output

def score_file(filename, name):
    file_output = convert_output_to_int(get_output_from_file(filename))
    answers = get_answers_from_test_corpus()
    print(name, 'overall accuracy: ', calculate_accuracy(file_output, answers))
    print(name, 'adjacent level accuracy: ', calculate_within_adj_accuracy(file_output, answers))
    for i in range(1, 6):
        print(name, 'N'+str(i)+' accuracy: ', calculate_level_accuracy(file_output, answers, i))
        print('N'+str(i)+' confusion: ', get_level_confusion_results(file_output, answers, i))
    print()

def score_file_dev(filename, name):
    file_output = convert_output_to_int(get_output_from_file(filename))
    answers = get_answers_from_dev_corpus()
    print(name, 'overall accuracy: ', calculate_accuracy(file_output, answers))
    print(name, 'adjacent level accuracy: ', calculate_within_adj_accuracy(file_output, answers))
    for i in range(1, 6):
        print(name, 'N'+str(i)+' accuracy: ', calculate_level_accuracy(file_output, answers, i))
        print('N'+str(i)+' confusion: ', get_level_confusion_results(file_output, answers, i))
    print()

score_file('./../baselines/baseline_outputs.txt/average_sentence_length_baseline_output.txt', 'Average Sentence Length Baseline')
score_file('./../baselines/baseline_outputs.txt/average_word_JLPT_baseline.txt', 'Average Word JLPT Level Baseline')
score_file('./../baselines/baseline_outputs.txt/hardest_word_baseline.txt', 'Hardest Word JLPT Level Baseline')
score_file('./../baselines/baseline_outputs.txt/word_complexity_non_augmented.txt', 'Word Complexity TFIDF, Most Cosine Similar, Non Augmented')
score_file('./../baselines/baseline_outputs.txt/word_complexity_augmented.txt', 'Word Complexity TFIDF, Most Cosine Similar, Augmented')
score_file_dev('./../baselines/baseline_outputs.txt/word_level_svm.txt', 'Word Level SVM')