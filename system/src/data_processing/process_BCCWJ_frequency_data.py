'''
Process the BCCWJ frequency data. Read the raw data and extract the 
necessary data and write it to BCCWJ_frequency_list.txt in the system_ready_data/training_data
directory.
'''
import csv

parsed_data = [] # necessary data
with open('./../../raw_data/BCCWJ_frequencylist_luw2_ver1_0.tsv', 'r') as data:
    rd = csv.reader(data, delimiter='\t')
    for row in rd:
        # append the word and its frequency count
        parsed_data.append([row[2], row[6]])

parsed_data = parsed_data[1:] # remove table column labels
with open('./../../system_ready_data/training_data/BCCWJ_frequency_list.txt', 'w') as output:
    for row in parsed_data:
        output.write('\t'.join(row) + '\n')

    