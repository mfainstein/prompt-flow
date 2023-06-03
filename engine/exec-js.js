#!/usr/bin/env node
(async function () {
  // Read input from command line arguments or pipe
  let code = '';
  if (process.argv.length > 2) {
    code = process.argv.slice(2).join(' ');
  } else {
    code = await new Promise((resolve) => {
      let data = '';
      process.stdin.on('data', (chunk) => {
        data += chunk;
      });
      process.stdin.on('end', () => {
        resolve(data);
      });
    });
  }
  const waitEval = (code) => {
    return new Promise((resolve, reject) => {
      eval(code);
    });
  };

  // Execute the JavaScript code using eval()
  try {
    await waitEval(code);
  } catch (error) {
    console.error('Error occurred during code execution:', error);
  }
})();