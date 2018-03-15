#For reference please take a look at https://gist.github.com/yosemitebandit/47ab89fe16939c4a7e1e
# Save the tsv or csv as a xls file.abs
# Then run the following command to run. 
#
# python xls_to_json.py in.xls Sheet1 out.json
#


import json
import sys
import xlrd


workbook = xlrd.open_workbook(sys.argv[1])
worksheet = workbook.sheet_by_name(sys.argv[2])

data = {}
keys = [v.value for v in worksheet.row(0)]
for row_number in range(worksheet.nrows):
    if row_number == 0:
        continue
    row_data = {}
    img_name = ""
    for col_number, cell in enumerate(worksheet.row(row_number)):
        row_data[keys[col_number]] = cell.value
        if keys[col_number] == "img_name":
            img_name = cell.value
    data[img_name] = row_data

with open(sys.argv[3], 'w') as json_file:
    json_file.write(json.dumps(data))
