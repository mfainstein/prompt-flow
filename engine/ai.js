#!/usr/bin/env node
const fs = require('fs').promises;
const axios = require('axios');
const path = require('path');
const process = require('process');
const { Configuration, OpenAIApi } = require('openai');
(async function () {
  const CREDENTIALS_PATH = path.join(process.cwd(), '/../openai_credentials.json');
  const credentialsJson = await fs.readFile(CREDENTIALS_PATH);
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
      const completion = await apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0.7,
      });
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
  callOpenAI(inputText)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('Error occurred during API call:', error);
    });
})();