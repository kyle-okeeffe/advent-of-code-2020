import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt')).map(Number);
input.sort((a, b) => a - b);

const findSumPair = (input, sum) => {
  // Expects input to be sorted
  let rightOffset = 1;
  let leftOffset = 0;
  let loopSum;
  while (leftOffset < input.length - rightOffset) {
    loopSum = input[leftOffset] + input[input.length - rightOffset];
    if (loopSum > sum) {
      rightOffset++;
    } else if (loopSum < sum) {
      leftOffset++;
    } else if (loopSum === sum) {
      return [input[leftOffset], input[input.length - rightOffset]];
    } else {
      return [];
    }
  }
  return [];
};

const pair = findSumPair(input, 2020);
if (pair.length === 2) {
  console.log(pair[0] * pair[1]);
}
