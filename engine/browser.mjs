#!/usr/bin/env node
import * as fs from 'fs';
import open from 'open';
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
    let timestamp = new Date().getTime(); 
    fs.writeFileSync('./../temp/page-'+timestamp+'.html', input, (err) => {
      if (err) {
        console.error('Error writing HTML file:', err);
        return;
      }
    });  
    open('./../temp/page-'+timestamp+'.html');
  } catch (error) {
    console.error('Error occurred during code execution:', error);
  }
})();