# Prompt-Flow 

Prompt-Flow is a library that enables seamless integration of OpenAI's ChatGPT model into command-line interfaces (CLIs) through piping. It empowers users to generate prompts, receive AI-generated responses, and execute code or view diagrams directly from the command line, enhancing productivity and creative workflows.

## Installation 
To install Prompt-Flow, cd into the directory and run `npm install`. To configure it, create a `openai_credentials.json` file in the root folder, with two fields: `apiKey` and `orgId` from your OpenAi account.

## Usage Example 
Here are a few usage examples: 
1. `echo 'hello world with a great twist! ' | code | ai | execute` 
2. `echo 'different types of coffee' | mermaid | ai | view-merm` 
3. `echo 'how to make coffee' | markdown | ai | view-md` 
4. `echo 'plot these countries and their populations: israel, lebanon, egypt, greece | chart | ai | execute`
5. `echo 'how to make coffee' | html | ai | open` 
6. echo "using leaflet js library, show on a worldmap a sample of 10 random countries with their population count; include the leaflet script as part of the html\!\!\!" | html | ai | browser