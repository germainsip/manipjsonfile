import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const askQuestion = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };
  
  // Main async function
  const main = async () => {
    // Get user input using await
    const name = await askQuestion('What is your name? ');
  
    // Print the result
    console.log(`Hello, ${name}!`);
  
    // Close the readline interface
    rl.close();
  };
rl.close();
// main()
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, 'geojson');
console.log(directoryPath)
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach

    files.filter((file) => file.substring(0,1) !== '.').forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});

