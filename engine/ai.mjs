#!/usr/bin/env node
import fs from 'fs';
import axios from 'axios';
import path from 'path'
import process from 'process';
import ora from 'ora';
import { Configuration, OpenAIApi } from 'openai';
(async function () {
  const CREDENTIALS_PATH = path.join(process.cwd(), '/../openai_credentials.json');
  const PROMPT_PATH = path.join(process.cwd(), '/../prompts/');
  const OUTPUT_PATH = path.join(process.cwd(), '/../output/');
  const credentialsJson = await fs.promises.readFile(CREDENTIALS_PATH);
  const credentials = JSON.parse(credentialsJson);
  // Set your OpenAI API credentials
  const configuration = new Configuration({
    apiKey: credentials.apiKey,
    organizationId: credentials.orgId,
  });
  const apiClient = new OpenAIApi(configuration);

  // Function to make the API call
  async function callOpenAI(prompt) {
    try {
      const spinner = ora({ spinner: 'pipe' }).start();
      /*
      spinner: {
          interval: 300, // Optional
          frames: ['🌀 ', '🌀 💬', '🌀 💬 🌀', '🌀 💬 🌀 💬', '🌀 💬 🌀 💬 🌀', '🌀 💬 🌀 💬 🌀 💬', '🌀 💬 🌀 💬 🌀 💬 🌀', '🌀 💬 🌀 💬 🌀 💬 🌀 💬', '🌀 💬 🌀 💬 🌀 💬 🌀 💬 🌀']
        }
      }).start();
      */
      const completion = await apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0.7,
      });
      spinner.stop();
      spinner.clear();
      return completion.data.choices[0].text;
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      return "Error: " + error.message;
    }
  }


  // Read input from command line arguments or pipe
  let inputText = '';
  if (process.argv.length > 2) {
    inputText = process.argv.slice(2).join(' ');
  } else {
    inputText = await new Promise((resolve) => {
      let data = '';
      process.stdin.on('data', (chunk) => {
        data += chunk;
      });
      process.stdin.on('end', () => {
        resolve(data);
      });
    });
  }

  // Make the API call
  let timestamp = new Date().getTime();
  callOpenAI(inputText)
    .then((response) => {
      console.log(response);
      fs.writeFileSync(PROMPT_PATH + timestamp + ".txt", inputText);
      fs.writeFileSync(OUTPUT_PATH + timestamp + ".txt", response);
    })
    .catch((error) => {
      fs.writeFileSync(PROMPT_PATH + timestamp + ".txt", inputText);
      fs.writeFileSync(OUTPUT_PATH + timestamp + ".txt", error);
      console.error('Error occurred during API call:', error);
    });
})();