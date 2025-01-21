const fs = require('fs');
const path = require('path');

const folderPath = 'reports/allure-results';
const seenNames = {};
const duplicateFiles = [];
const deletedFileNames = [];
let deleteCount = 0;

const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const unlinkFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

fs.readdir(folderPath, async (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const resultFiles = files.filter(file => file.endsWith('-result.json'));

    for (const file of resultFiles) {
        const filePath = path.join(folderPath, file);

        try {
            const data = await readFileAsync(filePath);
            const jsonData = JSON.parse(data);

            if (!seenNames[jsonData.name]) {
                seenNames[jsonData.name] = filePath;
            } else {
                duplicateFiles.push(seenNames[jsonData.name]);
                duplicateFiles.push(filePath);
                deletedFileNames.push(jsonData.name);
            }
        } catch (error) {
            console.error('Error processing file:', filePath, error);
        }
    }

    // Ensure all file reading operations are completed before processing duplicate files
    for (const filePath of duplicateFiles) {
        try {
            await unlinkFileAsync(filePath);
            deleteCount++;
            console.log('File deleted:', filePath);
        } catch (err) {
            console.error('Error deleting file:', filePath, err);
        }
    }

    console.log('Total files deleted:', deleteCount);
    console.log('Deleted file names:', deletedFileNames);
}); 
