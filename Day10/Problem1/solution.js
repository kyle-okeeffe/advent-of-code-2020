import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'))
  .map(num => Number(num)).sort((a, b) => a - b);

const joltAdapterDifferences = (max, wall, deviceDiff, adapters) => {
  const diffs = [];
  for (let i = 0; i < max; i++) {
    diffs.push(0);
  }
  adapters.unshift(wall);
  adapters.push(adapters[adapters.length - 1] + deviceDiff);
  for (let i = 0; i < adapters.length - 1; i++) {
    diffs[adapters[i + 1] - adapters[i] - 1]++;
  }
  return diffs;
};

const diffs = joltAdapterDifferences(3, 0, 3, input);
console.log(diffs[0] * (diffs[2]));
