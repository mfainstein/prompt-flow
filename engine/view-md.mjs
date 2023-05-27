#!/usr/bin/env node
import cliMd from 'cli-markdown';
(async function () {
  // Read input from command line arguments or pipe
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

  try {
    console.log(cliMd(input));
  } catch (error) {
    console.error('Error occurred during code execution:', error);
  }
})();