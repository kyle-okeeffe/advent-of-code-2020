import fs from 'fs';

const readInputFile = (inputPath) => fs.readFileSync(inputPath, 'utf8');

const readInputFileToArray = (inputPath) => {
  const input = readInputFile(inputPath).split('\n');
  if (input[input.length - 1] === '') {
    input.pop();
  }
  return input;
};

export { readInputFile, readInputFileToArray };
