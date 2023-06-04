// readFiles.js

const fs = require('fs');
const path = require('path');
const os = require('os');

// specify the directory you want to read
const dirPath = path.resolve(__dirname, './engine');
const executablesPath = path.resolve(__dirname, './executables');
const { uid, gid } = os.userInfo();

//create "executabels folder if dows not exist"
if (!fs.existsSync(executablesPath)) {
    fs.mkdirSync(executablesPath);
}

let executableContent = '\
    #!/bin/bash \n\
    # Path to the folder or executable script you want to alias \n\
    path_to_target="/../engine" \n\
    abs_path=$(cd $(dirname "$0") && pwd -P) \n\
    # Execute the target folder or script \n\
    cd "$abs_path$path_to_target" \n\
    ./<FILENAME> "$@"\
'

fs.chmod(executablesPath, 0o711, err => {
    if (err) {
        console.error(`Unable to change permissions of ${file}:`, err);
    } else {
        //console.log(`Changed permissions of ${file} to 711`);
    }
});
fs.chown(executablesPath, uid, gid, (err) => {
    if (err) {
        console.error(`Unable to change owner of ${file}:`, err);
        return;
    }
});
fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.error('An error occurred:', err);
    } else {
        for (let file of files) {
            let baseName = file.split('.').slice(0, -1).join('.');
            if (file.endsWith("js") || file.endsWith("mjs")) {
                fs.writeFileSync(executablesPath + "/" + baseName, executableContent.replace("<FILENAME>", file));
                fs.chown(executablesPath + "/" + baseName, uid, gid, (err) => {
                    if (err) {
                        console.error(`Unable to change owner of ${file}:`, err);
                        return;
                    }
                });
                fs.chmod(executablesPath + "/" + baseName, 0o711, err => {
                    if (err) {
                        console.error(`Unable to change permissions of ${file}:`, err);
                    } else {
                        //console.log(`Changed permissions of ${file} to 711`);
                    }
                });
            }
        }

    }
});