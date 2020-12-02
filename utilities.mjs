import fs from 'fs';

function readInputFile(inputPath) {
  return fs.readFileSync(inputPath, 'utf8');
}

function readInputFileToArray(inputPath) {
  var input = readInputFile(inputPath).split('\n');
  if (input[input.length-1] == '') {
    input.pop();
  }
  return input;
}

export { readInputFile, readInputFileToArray };