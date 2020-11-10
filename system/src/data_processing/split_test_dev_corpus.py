'''
Script for splitting documents into development and test corpora from a single corpus of text.
Alternate between allocating documents to development and test corpora to ensure deterministic 
split between documents.
'''

document_level_pairs = []
level_totals = [0,0,0,0,0]
total_documents = 0
with open('./../../raw_data/dev_test_corpus.txt', 'r') as file:
    content = file.readlines()
    document = ''
    for i in range(len(content)):
        if content[i] == '\n' and len(document) > 0:
            level = int(document[-1])
            document = document[:-1]
            document_level_pairs.append([document, level])
            total_documents += 1
            level_totals[level - 1] += 1
            document = ''
        else:
            line = content[i]
            document += line.rstrip('\n')
    
print("Total documents: " + str(total_documents))
print("Document level totals from 1 - 5: " + str(level_totals))

