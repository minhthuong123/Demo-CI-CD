const fs = require('fs');
const csv = require('csv-parser');

const downloadedFilePath = 'allure-report/data/suites.csv';
let testCaseCount = 0;
const testCaseNames = [];

if (fs.existsSync(downloadedFilePath)) {
    console.log(`Download file successfully: ${downloadedFilePath}`);

    fs.createReadStream(downloadedFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // Push test case
            if (row.Name == null) {
                testCaseNames.push(row.NAME);
            } else {
                testCaseNames.push(row.Name);
            }
            testCaseCount++;
        })
        .on('end', () => {
            // Record current data
            const filePath = 'src/data/TestCaseNameReportCurrent.json';
            fs.writeFileSync(filePath, JSON.stringify(testCaseNames, null, 2), 'utf-8');

            // Read file storeTestCaseNameReport.json
            const json1 = JSON.parse(fs.readFileSync('src/data/storeTestCaseNameReport.json', 'utf-8'));

            // Compare
            const missingInJson2 = json1.filter(name => !testCaseNames.includes(name));

            if (missingInJson2.length > 0) {
                console.log('Missing names:', missingInJson2);
            } else {
                console.log('Contains all names');
            }
        });
} else {
    console.error(`File not found: ${downloadedFilePath}`);
}