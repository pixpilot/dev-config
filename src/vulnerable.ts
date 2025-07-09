// vulnerable.ts
import { exec } from 'child_process';

export function runCommand(userInput: string) {
  exec(`ls ${userInput}`, (error, stdout, _stderr) => {
    if (error) {
      console.error(`exec error:`, error);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
