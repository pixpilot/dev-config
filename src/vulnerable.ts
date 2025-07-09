// src/vulnerable.ts
import { exec } from 'child_process';
import * as http from 'http';

// This is the same vulnerable function as before
function runCommand(userInput: string) {
  // SINK: The dangerous operation
  exec(`ls ${userInput}`, (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
  });
}

// Create a server to provide a SOURCE for untrusted data
const server = http.createServer((req, res) => {
  // SOURCE: Getting untrusted data from a URL parameter
  const urlString = req.url ?? '/';
  const unsafeUserInput = new URL(
    urlString,
    `http://${req.headers.host}`,
  ).searchParams.get('file');

  if (unsafeUserInput) {
    // This connects the SOURCE to the SINK
    runCommand(unsafeUserInput);
    res.end(`Running command for: ${unsafeUserInput}`);
  } else {
    res.end('Please provide a file parameter. e.g., ?file=test');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
