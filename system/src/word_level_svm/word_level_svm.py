from sklearn import svm
import json

clf = svm.SVC(class_weight={1: 1.1, 2: 1, 3: 1.3, 4: 1.1, 5: 1.3}, decision_function_shape='ovr')
clf = svm.SVR()

training_data = None
with open('./../../system_ready_data/word_level_distribution_svm/train_features.json', 'r') as fp:
    training_data = json.load(fp)

# training data is list of lists indexed at [document][feature/level]
# document feature/level list is of form [%N1, %N2, %N3, %N4, %N5, level]

X = []
Y = []
for document in training_data:
    X.append(document[0:6])
    Y.append(document[6])

clf.fit(X, Y)

dev_data = None
with open('./../../system_ready_data/word_level_distribution_svm/dev_features.json', 'r') as fp:
    dev_data = json.load(fp)

dev_X = []
dev_Y = []
for document in dev_data:
    dev_X.append(document[0:6])
    dev_Y.append(document[6])

test_data = None
with open('./../../system_ready_data/word_level_distribution_svm/test_features.json', 'r') as fp:
    test_data = json.load(fp)

test_X = []
for document in test_data:
    test_X.append(document[0:6])

open('./../../src/baselines/baseline_outputs.txt/word_level_svm.txt', 'w').close()
with open('./../../src/baselines/baseline_outputs.txt/word_level_svm.txt', 'a') as file:
    for predicition in clf.predict(dev_X): #TODO switch to test
        file.write(str(predicition) + '\n')


N5_classifier = svm.SVC( decision_function_shape='ovo', class_weight={0: 1, 5: 2}, probability=True)
N4_classifier = svm.SVC( decision_function_shape='ovo', class_weight={0: 1, 4: 5}, probability=True)
N3_classifier = svm.SVC( decision_function_shape='ovo', class_weight={0: 1, 3: 7}, probability=True)
N2_classifier = svm.SVC( decision_function_shape='ovo', class_weight={0: 1, 2: 4}, probability=True)

N5_classifier = svm.SVR()
N4_classifier = svm.SVR()
N3_classifier = svm.SVR()
N2_classifier = svm.SVR()

n1_docs = []
n2_docs = []
n3_docs = []
n4_docs = []
n5_docs = []

for document in training_data:
    if (document[6] == 1):
        n1_docs.append(document)
    elif (document[6] == 2):
        n2_docs.append(document)
    elif (document[6] == 3):
        n3_docs.append(document)
    elif (document[6] == 4):
        n4_docs.append(document)
    else:
        n5_docs.append(document)

def get_xy_for_training (doc_list, target_class, t):
    x = []
    y = []
    for document in doc_list:
        x.append(document[0:5]+[document[5]])
        if (document[6] == target_class):
            y.append(document[6])
        else:
            y.append(0)
    return [x,y]

N5_classifier.fit(get_xy_for_training(training_data, 5, [3,5])[0], get_xy_for_training(training_data, 5, [3,5])[1])
N4_classifier.fit(get_xy_for_training(n4_docs+n3_docs+n2_docs+n1_docs, 4, [2, 4])[0], get_xy_for_training(n4_docs+n3_docs+n2_docs+n1_docs, 4, [2, 4])[1])
N3_classifier.fit(get_xy_for_training(n3_docs+n2_docs+n1_docs, 3, [1,3])[0], get_xy_for_training(n3_docs+n2_docs+n1_docs, 3, [1,3])[1])
N2_classifier.fit(get_xy_for_training(n2_docs+n1_docs, 2, [0,2])[0], get_xy_for_training(n2_docs+n1_docs, 2, [0,2])[1])

linear_answers = []
i = 0
for doc in dev_X:
    if N5_classifier.predict([doc]) == [5]:
        linear_answers.append(5)
        #print(N5_classifier.predict_proba([doc[3:5]+[doc[5]]]), " ", dev_Y[i])
    elif N4_classifier.predict([doc]) == [4]:
        linear_answers.append(4)
    elif N3_classifier.predict([doc]) == [3]:
        linear_answers.append(3)
    elif N2_classifier.predict([doc]) == [2]:
        linear_answers.append(2)
    else:
        linear_answers.append(1)
    i += 1

# open('./../../src/baselines/baseline_outputs.txt/word_level_svm.txt', 'w').close()
# with open('./../../src/baselines/baseline_outputs.txt/word_level_svm.txt', 'a') as file:
#     for predicition in linear_answers: #TODO switch to test
#         file.write(str(predicition) + '\n')