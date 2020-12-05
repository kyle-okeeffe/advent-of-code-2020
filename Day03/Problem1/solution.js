import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'));

const isTreeAtPosition = (pattern, position) => {
  const index = position % pattern.length;
  return pattern[index] === '#';
};

const treesAlongSlope = (input, moveRight, moveDown) => {
  let column = moveRight;
  let treeCount = 0;
  for (let i = moveDown; i < input.length; i += moveDown) {
    treeCount += isTreeAtPosition(input[i], column);
    column += moveRight;
  }
  return treeCount;
};

console.log('Slope of 3/1: ', treesAlongSlope(input, 3, 1));
