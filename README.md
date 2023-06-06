# Prompt-Flow 🌀 💬 
 > The cyclone symbolizes the idea of a pipe that connects between elements, while the speech balloon symbolizes the idea of the user being able to generate prompts and receive AI-generated responses. 
 Together, they represent the library's ability to empower users to execute code or view diagrams directly
 from the command line, enhancing productivity and creative workflows.

Prompt-Flow is a library that enables seamless integration of OpenAI's ChatGPT model into command-line interfaces (CLIs) through piping. It empowers users to generate prompts, receive AI-generated responses, and execute code or view diagrams directly from the command line, enhancing productivity and creative workflows.

## Usage example

## Installation 
To install Prompt-Flow, cd into the directory and run `npm install`. To configure it, create a `openai_credentials.json` file in the root folder, with two fields: `apiKey` and `orgId` from your OpenAi account.

## Executables
After installing and configuring Prompt-Flow, you can take advantage of 'npm run executables' to run commands (from everywhere)
 `echo 'hello world with a great twist! ' | code | ai | execute` 
instead of 
`echo 'hello world with a great twist! ' | ./engine/code.js | ./engine/ai.js | ./engine/execute.js`
in the directory of installation.

1. Run the command `npm run executables` in your terminal.
2. Ensure that your system's PATH includes the directory where the Prompt-Flow executable resides (/engine).

## More  
Here are a few usage examples: 
1. `echo 'hello world with a great twist! ' | code | ai | execute` 
2. `echo 'different types of coffee' | mermaid | ai | view-merm` 
3. `echo 'how to make coffee' | markdown | ai | view-md` 
4. `echo 'plot these countries and their populations: israel, lebanon, egypt, greece | chart | ai | execute`
5. `echo 'how to make coffee' | html | ai | open` 
6. `echo "using leaflet js library, show on a worldmap a sample of 10 random countries with their population count; include the leaflet script as part of the html\!" | html | ai | browser`