const fs = require('fs');
const csv = require('csv-parser');

// const downloadedFilePath = 'src/data/Download/data_suites.csv';
const downloadedFilePath = 'allure-report/data/suites.csv';
const rowsArrayTestCase = [];
const rowsArrayTestID = [];
let testCaseCount = 0;
let CountBugID = 0;

if (fs.existsSync(downloadedFilePath)) {
    console.log(`Download file successfully: ${downloadedFilePath}`);
    fs.createReadStream(downloadedFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.Status === 'broken' || row.Status === 'failed') {
                let text = row.Name;
                rowsArrayTestCase.push(text);
                testCaseCount++;
                const pattern = /\[([A-Z0-9-]+)\](?:\s*)?\[WA\]/g;
                const matches = Array.from(text.matchAll(pattern), (match) => match[1]);
                matches.forEach((match) => {
                    rowsArrayTestID.push(match);
                    CountBugID++;
                });
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            console.log("Test case count:", testCaseCount);
            console.log("Test case bug:", rowsArrayTestCase);
            console.log("Count bug ID:", CountBugID);
            console.log("Bug ID: ", rowsArrayTestID.join(' '));
        });
} else {
    console.error(`Not search download file: ${downloadedFilePath}`);
}
