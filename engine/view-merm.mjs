#!/usr/bin/env node
import { renderMermaid } from 'mermaid-render';
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
    const svg = await renderMermaid(input);
    fs.writeFileSync('temp/image.svg', svg, (err) => {
      if (err) {
        console.error('Error writing SVG file:', err);
        return;
      }
    });  
    open('image.svg');
  } catch (error) {
    console.error('Error occurred during code execution:', error);
  }
})();