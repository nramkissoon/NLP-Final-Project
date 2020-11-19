'''
Script for splitting documents into development and test corpora from a single corpus of text.
Alternate between allocating documents to development and test corpora to ensure deterministic 
split between documents.
'''

documents = [None] * 5
for i in range(5):
    documents[i] = []

level_totals = [0,0,0,0,0]
total_documents = 0
with open('./../../raw_data/dev_test_corpus.txt', 'r') as file:
    content = file.readlines()
    document = ''
    for i in range(len(content)):
        if content[i] == '\n' and len(document) > 0:
            level = int(document[-1])
            document = document[:-1]
            documents[level-1].append(document)
            total_documents += 1
            level_totals[level - 1] += 1
            document = ''
        else:
            line = content[i]
            document += line.rstrip()

print("Total documents: " + str(total_documents))
print("Document level totals from 1 - 5: " + str(level_totals))
print()
print("Splitting documents into development and test corpora...")

open('./../../system_ready_data/development_corpus.txt', 'w').close()
open('./../../system_ready_data/test_corpus.txt', 'w').close()
open('./../../system_ready_data/training_corpus.txt', 'w').close()
total_training = 0
total_development = 0
total_test = 0
for i in range(5):
    jlpt_level_documents = documents[i]
    which_corpus = 0
    for document in jlpt_level_documents:
        if which_corpus < 7:
            with open('./../../system_ready_data/training_corpus.txt', 'a') as file:
                file.write(str(i+1) + '\n')
                file.write(document)
                file.write('\n\n')
            total_training += 1
        elif which_corpus < 8:
            with open('./../../system_ready_data/development_corpus.txt', 'a') as file:
                file.write(str(i+1) + '\n')
                file.write(document)
                file.write('\n\n')
            total_development += 1
        else:
            with open('./../../system_ready_data/test_corpus.txt', 'a') as file:
                file.write(str(i+1) + '\n')
                file.write(document)
                file.write('\n\n')
            total_test += 1
        which_corpus += 1
        if (which_corpus == 10):
            which_corpus = 0
        
print("Documents split into training, development, and test corpora.")
print("Total training documents: ", total_training)    
print("Total developement documents: ", total_development)
print("Total test documents: ", total_test)  
print()  