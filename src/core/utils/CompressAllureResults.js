const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const directoryPath = 'reports/allure-results';

const outputFilePath = 'reports/allure-results.zip';

const output = fs.createWriteStream(outputFilePath);

const archive = archiver('zip', {
  zlib: { level: 9 } 
});

output.on('close', () => {
  console.log(`Archive created successfully. Total size: ${archive.pointer()} bytes`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

archive.directory(directoryPath, false);

archive.finalize();