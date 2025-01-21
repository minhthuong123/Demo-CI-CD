const path = require('path');
const fs = require('fs');

const folderPath = 'reports/allure-results';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const resultFiles = files.filter(file => file.endsWith('-result.json'));
  let CountFileFailed = 0;
  let processedFiles = 0;

  if (resultFiles.length === 0) {
    console.log('No files to process');
    return;
  }

  resultFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        processedFiles++;
        if (processedFiles === resultFiles.length) {
          console.log('Count File Failed:', CountFileFailed);
        }
        return;
      }

      const jsonData = JSON.parse(data);
      if (jsonData.status !== 'passed') {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            CountFileFailed++;
            console.log('File deleted:', filePath);
          }
          processedFiles++;
          if (processedFiles === resultFiles.length) {
            console.log('Count File Failed:', CountFileFailed);
          }
        });
      } else {
        processedFiles++;
        if (processedFiles === resultFiles.length) {
          console.log('Count File Failed:', CountFileFailed);
        }
      }
    });
  });
});
