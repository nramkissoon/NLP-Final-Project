#!/bin/bash 

cd ../src/data_processing/

python3 split_test_dev_corpus.py

python3 jlpt_word_regression.py

cd ../baselines

python3 average_sentence_length.py

cd ../scoring

python3 score.py