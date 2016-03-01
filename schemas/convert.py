import xlrd
import glob
import csv
import os.path

def convertRow(row):
    return [cell.value for cell in row]

filenames = glob.glob('*.xls')

for nfile, filename in enumerate(filenames):
    stem, _ = os.path.splitext(filename)

    with xlrd.open_workbook(filename) as book:
        print('%10s (%2d/%2d)...' % (filename, nfile, len(filenames)))

        for nsheet, sheet in enumerate(book.sheets()):
            sheetfile = '%s.%d.csv' % (stem, nsheet)

            with open(sheetfile, 'w') as f:
                writer = csv.writer(f)

                for nrow in range(sheet.nrows):
                    writer.writerow(convertRow(sheet.row(nrow)))

