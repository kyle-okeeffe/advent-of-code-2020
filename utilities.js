import fs from 'fs';

const readInputFile = (inputPath) => fs.readFileSync(inputPath, 'utf8');

const readInputFileToArray = (inputPath) => {
  const input = readInputFile(inputPath).split('\n');
  while (input[input.length - 1] === '') {
    input.pop();
  }
  return input;
};

const chunkInputOnEmptyStrings = (input) => {
  const items = [[]];
  for (const line of input) {
    if (line === '') {
      if (items[items.length - 1].length !== 0) {
        items.push([]);
      }
    } else {
      items[items.length - 1].push(line);
    }
  }
  return items;
};

export { chunkInputOnEmptyStrings, readInputFile, readInputFileToArray };
