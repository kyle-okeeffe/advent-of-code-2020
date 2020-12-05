import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt')).map(Number);
input.sort((a, b) => a - b);

const findSumPair = (input, sum) => {
  let rightIndex = input.length - 1;
  let leftIndex = 0;
  let loopSum;
  while (leftIndex < rightIndex) {
    loopSum = input[leftIndex] + input[rightIndex];
    if (loopSum > sum) {
      rightIndex--;
    } else if (loopSum < sum) {
      leftIndex++;
    } else if (loopSum === sum) {
      return [input[leftIndex], input[rightIndex]];
    } else {
      return [];
    }
  }
  return [];
};

const findSumOfX = (input, sum, numOfAddends) => {
  if (numOfAddends < 2) {
    return [];
  } else if (numOfAddends === 2) {
    return findSumPair(input, sum);
  }
  // Keeps track of all but the last two indexes which will be used in findSumPair
  const subIndexes = [...Array(numOfAddends - 2).keys()];

  while (subIndexes[0] <= input.length - numOfAddends) {
    const subSum = subIndexes.reduce((accum, index) => accum + input[index], 0);
    // Calls findSumPair on the input after the last
    // subIndex with sum minus sum of the subIndexes
    const sumPair = findSumPair(input
      .slice(subIndexes[subIndexes.length - 1] + 1), sum - subSum);

    if (sumPair.length === 0) {
      // Loops until there is a subIndex that has space to be shifted right
      for (let i = subIndexes.length - 1; i >= 0; i--) {
        if (subIndexes[i] < input.length - 3 - (subIndexes.length - i)) {
          subIndexes[i]++;
          // Resets any subIndexes to the right of the shifted index
          for (let j = i + 1; j < subIndexes.length; j++) {
            subIndexes[j] = subIndexes[i] + (j - i);
          }
          break;
        } else if (i === 0) {
          return [];
        }
      }
    } else {
      return subIndexes.map(index => input[index]).concat(sumPair);
    }
  }
  return [];
};

console.log('Sum of 2020 from 2 Addends');
let sumArray = findSumOfX(input, 2020, 2);
if (sumArray.length > 0) {
  console.log(sumArray);
  console.log(sumArray.reduce((accum, currVal) => accum * currVal));
}

console.log('Sum of 2020 from 3 Addends');
sumArray = findSumOfX(input, 2020, 3);
if (sumArray.length > 0) {
  console.log(sumArray);
  console.log(sumArray.reduce((accum, currVal) => accum * currVal));
}
