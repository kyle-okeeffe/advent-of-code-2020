import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'))
  .map(num => Number(num)).sort((a, b) => a - b);

const joltAdapterCombos = (maxDiff, adapters) => {
  const acc = adapters.map(iteam => 0);
  acc[acc.length - 1] = 1;
  for (let i = adapters.length - 1; i >= 0; i--) {
    for (let j = i + 1; j < adapters.length; j++) {
      if (adapters[j] <= adapters[i] + maxDiff) {
        acc[i] += acc[j];
      } else {
        break;
      }
    }
  }
  return acc[0];
};

input.unshift(0);
input.push(input[input.length - 1] + 3);
console.log(joltAdapterCombos(3, input));
