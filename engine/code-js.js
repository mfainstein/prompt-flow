#!/usr/bin/env node
(async function () {
  // Read input from command line arguments or pipe
  // ------------------------------------------------------------
  // Called with arguments. E.g.:
  // ./example-script "pass in this string as input"
  // ------------------------------------------------------------
  let input = '';
  if (process.argv.length > 2) {
    input = process.argv.slice(2).join(' ');
  } else {
    input = await new Promise((resolve) => {
      let data = '';
      process.stdin.on('data', (chunk) => {
        data += chunk;
      });
      process.stdin.on('end', () => {
        resolve(data);
      });
    });
  }

  // Add the prefix to the input string
  const prefix = 'Output code only (in javascript) of the following prompt: \n';
  const result = prefix + ' ' + input;

  // Output the result
  console.log(result);
})();