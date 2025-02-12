const fs = require('fs')
const fse = require('fs-extra');

// directory path
// const dir = './temp/log';



class FileUtil {

    async writeJsonFile(patch, file_name, json_data) {
        fs.writeFile(patch + file_name + '.json', JSON.stringify(json_data), function(err){
            if(err) throw err;
        })
    }

    async deleteFolder(dir) {
        // delete directory recursively
        try {
            fs.rmSync(dir, { recursive: true });
            console.log(`${dir} is deleted!`);
        } catch (err) {
            console.error(`Error while deleting ${dir}.`);
        }
    }
    async createFolder(dir) {
        console.log('Create folder ' + dir + ' successful')
        if (fs.existsSync(dir) == false) {
            fs.mkdirSync(dir)
            console.log('Create folder ' + dir + ' successful')
        } else {
            console.log('Folder ' + dir + ' is exist')
        }

    }

    // To copy a folder or file  
    async copyFolder(srcDir, destDir) {
        console.log('Copy', fs.existsSync(srcDir))
        // if (fs.existsSync(source)) {
        //     fs.copyFileSync(source, des)
        //     console.log('Copy folder ' + source + ' to ' + des)
        // } else {
        //     console.log('Folder ' + source + ' does not exist')
        // }
        fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
            if (err) {                 
              console.error(err)
            } else {
              console.log("success!")
            }
        })
    }

    async isReportDirExisted() {
        let dir_report = './allure-report'
        // check if directory exists
        if (fs.existsSync(dir_report)) {
            console.log('Directory exists!')
            return true
        } else {
            console.log('Directory not found.')
            return false
        }
    }
}

module.exports = new FileUtil()