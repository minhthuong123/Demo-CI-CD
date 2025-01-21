const fs = require('fs');
const csv = require('csv-parser');

// const downloadedFilePath = 'src/data/Download/data_suites.csv';
const downloadedFilePath = 'allure-report/data/suites.csv';
let testCaseCount = 0;
const testCaseNames = [];

if (fs.existsSync(downloadedFilePath)) {
    console.log(`Download file successfully: ${downloadedFilePath}`);

    fs.createReadStream(downloadedFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.Name == null) {
                testCaseNames.push(row.NAME);
            } else {
                testCaseNames.push(row.Name);
            }
            testCaseCount++;
        })
        .on('end', () => {
            const filePath = 'src/data/storeTestCaseNameReport.json';
            fs.writeFileSync(filePath, JSON.stringify(testCaseNames, null, 2), 'utf-8');
            
            console.log("Test case count:", testCaseCount);
            console.log("Test case names have been saved to:", filePath);
        });
} else {
    console.error(`File not found: ${downloadedFilePath}`);
}