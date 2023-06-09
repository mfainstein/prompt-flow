#!/usr/bin/env node
import { renderMermaid } from 'mermaid-render';
import * as fs from 'fs';
import open from 'open';
import * as child from 'child_process';
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
  let timestamp = new Date().getTime(); 
  try {
    fs.writeFileSync('./../temp/markdown-'+timestamp+'.md', input, (err) => {
      if (err) {
        console.error('Error writing markdown file:', err);
        return;
      }
    });  
  } catch (error) {
    console.error('Error occurred during code execution:', error);
  }
  child.exec("npm run markmap --  "+'./temp/markdown-'+timestamp+'.md', (error)=>{
    console.log("Error "+ error)
  })
})();