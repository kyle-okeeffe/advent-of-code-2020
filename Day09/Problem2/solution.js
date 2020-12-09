import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt')).map(num => Number(num));

const verifySumFrom = (sum, nums) => {
  nums.sort((a, b) => a - b);
  let leftIndex = 0;
  let rightIndex = nums.length - 1;
  while (leftIndex < rightIndex) {
    const numSum = nums[leftIndex] + nums[rightIndex];
    if (numSum < sum) {
      leftIndex++;
    } else if (numSum > sum) {
      rightIndex--;
    } else {
      return [leftIndex, rightIndex];
    }
  }
  return [];
};

const findIncorrectXmasNum = (numSeq, preambleLength) => {
  for (let i = preambleLength; i < numSeq.length; i++) {
    const sumIndexes = verifySumFrom(numSeq[i], numSeq.slice(i - preambleLength, i));
    if (sumIndexes.length === 0) {
      return numSeq[i];
    }
  }
};

const findXmasWeakness = (numSeq, preambleLength) => {
  const incorrectNum = findIncorrectXmasNum(numSeq, preambleLength);
  for (let i = 0; i < numSeq.length - 1; i++) {
    let acc = numSeq[i];
    let min = numSeq[i];
    let max = numSeq[i];
    for (let j = i + 1; j < numSeq.length; j++) {
      acc += numSeq[j];
      if (numSeq[j] < min) {
        min = numSeq[j];
      } else if (numSeq[j] > max) {
        max = numSeq[j];
      }
      if (acc > incorrectNum) {
        break;
      } else if (acc === incorrectNum) {
        return min + max;
      }
    }
  }
};

console.log(findXmasWeakness(input, 25));
