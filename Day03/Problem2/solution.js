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

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];

const slopeTressProduct = slopes.reduce((acc, curr) => {
  return acc * treesAlongSlope(input, curr[0], curr[1]);
}, 1);
console.log('Product of trees along slopes: ', slopeTressProduct);
