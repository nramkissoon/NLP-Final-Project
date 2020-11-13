import sys

def calculate_accuracy(output: list, answer_key: list):
    correct = 0
    total = len(output)
    assert(len(output) == len(answer_key))
    for i in range(len(output)):
        if output[i] == answer_key[i]:
            correct+=1
    return correct / total

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

def score_file(filename):
    return calculate_accuracy(convert_output_to_int(
        get_output_from_file(filename)),
        get_answers_from_test_corpus())

print("Average Sentence Length Baseline Accuracy: ", score_file('./../baselines/baseline_outputs.txt/average_sentence_length_baseline_output.txt'))

