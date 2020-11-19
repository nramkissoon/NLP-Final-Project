import json

filenames = ["JLPT" + str(i) for i in range(1, 6)]
for filename in filenames:
    with open('./../../raw_data/JLPT_word/' + filename + '.txt', 'r') as raw_data:
        data = raw_data.readlines()
        parsed_data = []
        for line in data:
            if len(line.split()) > 0:
                parsed_data.append(line.split()[0])
        with open('./../../system_ready_data/training_data/JLPT_word_lists/' + filename + '.json', 'w') as file:
            json.dump(parsed_data, file, indent=4, ensure_ascii=False)