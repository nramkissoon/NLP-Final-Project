'''
Baseline system that uses a linear regression model with average sentence length feature to predict JLPT level.
'''
from sklearn import linear_model

def calculate_average_senetence_length(document: str):
    sentences = document.split('。')
    total_sentences = len(sentences)
    total_length = 0
    for sentence in sentences:
        total_length += len(sentence)
    return total_length / total_sentences

training_data = []

with open('./../../system_ready_data/training_corpus.txt', 'r') as file:
    lines = file.readlines()
    document_features = [None] * 2
    for line in lines:
        if line == '\n':
            training_data.append(document_features)
            document_features = [None] * 2
            continue
        line = line.rstrip('\n')
        if len(line) == 1 and document_features[0] is None:
            document_features[0] = int(line)
        else:
            document_features[1] = calculate_average_senetence_length(line)

print('Running average sentence length baseline regression...')
model = linear_model.LinearRegression()
model.fit([training_data[i][1:] for i in range(len(training_data))], [training_data[i][0] for i in range(len(training_data))])

test_data = []
with open('./../../system_ready_data/test_corpus.txt', 'r') as file:
    lines = file.readlines()
    document_features = [None] * 2
    for line in lines:
        if line == '\n':
            test_data.append(document_features)
            document_features = [None] * 2
            continue
        line = line.rstrip('\n')
        if len(line) == 1 and document_features[0] is None:
            document_features[0] = int(line)
        else:
            document_features[1] = calculate_average_senetence_length(line)

print("R^2 score: ", model.score([test_data[i][1:] for i in range(len(test_data))], [test_data[i][0] for i in range(len(test_data))]))
predictions = model.predict([test_data[i][1:] for i in range(len(test_data))])

with open('./baseline_outputs.txt/average_sentence_length_baseline_output.txt', 'w') as file:
    for prediction in predictions:
        file.write(str(prediction) + '\n')

print('Average sentence length baseline results written to file.')
