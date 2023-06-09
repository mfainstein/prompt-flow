#!/usr/bin/env node
import inquirer from 'inquirer';
(async function () {
    // Read input from command line arguments or pipe
    // ------------------------------------------------------------
    // Called with arguments. E.g.:
    // ./example-script "pass in this string as input"
    // ------------------------------------------------------------
    let input = await new Promise((resolve) => {
        let data = '';
        process.stdin.on('data', (chunk) => {
            data += chunk;
        });
        process.stdin.on('end', () => {
            resolve(data);
        });
    });

    let prefix = process?.argv?.slice(2)?.join(' ');
    //TODO: input has \n at the end
    console.log(prefix+"\n" + input);

})();