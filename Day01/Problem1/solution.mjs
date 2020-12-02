import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.mjs';

function findSumPair(input, sum) {
  input.sort((a, b) => a - b);
  var rightOffset = 1;
  var leftOffset = 0;
  var loopSum;
  while (leftOffset < input.length - rightOffset) {
    loopSum = input[leftOffset] + input[input.length - rightOffset];
    if (loopSum > sum) {
      rightOffset++;
    } else if (loopSum < sum) {
      leftOffset++;
    } else if (loopSum == sum) {
      return [input[leftOffset], input[input.length - rightOffset]];
    } else {
      return [];
    }
  }
  return [];
}

var __dirname = path.dirname(fileURLToPath(import.meta.url));

var input = readInputFileToArray(path.join(__dirname, '../input.txt')).map(Number);
var pair = findSumPair(input, 2020);
if (pair.length == 2) {
  console.log(pair[0] * pair[1]);
}