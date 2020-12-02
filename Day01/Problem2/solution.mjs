import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.mjs';

function findSumPair(input, sum) {
  input.sort((a, b) => a - b);
  var rightIndex = input.length - 1;
  var leftIndex = 0;
  var loopSum;
  while (leftIndex < rightIndex) {
    loopSum = input[leftIndex] + input[rightIndex];
    if (loopSum > sum) {
      rightIndex--;
    } else if (loopSum < sum) {
      leftIndex++;
    } else if (loopSum == sum) {
      return [input[leftIndex], input[rightIndex]];
    } else {
      return [];
    }
  }
  return [];
}

function findSumOfX(input, sum, numOfAddends) {
  if (numOfAddends < 2) {
    return [];
  } else if (numOfAddends == 2) {
    return findSumPair(input, sum);
  }
  input.sort((a, b) => a - b);
  var subIndexes = [...Array(numOfAddends-2).keys()];
  while (subIndexes[0] <= input.length - numOfAddends) {
    var subSum = subIndexes.reduce((accum, index) => accum + input[index], 0);
    var sumPair = findSumPair(input
      .slice(subIndexes[subIndexes.length-1] + 1), sum - subSum);
    if (sumPair.length == 0) {
      for (var i = subIndexes.length - 1; i >= 0; i--) {
        if (subIndexes[i] < input.length - 3 - (subIndexes.length - i)) {
          subIndexes[i]++;
          for (var j = i + 1; j < subIndexes.length; j++) {
            subIndexes[j] = subIndexes[i] + (j-i);
            break;
          }
        } else if (i == 0) {
          return [];
        }
      }
    } else {
      return subIndexes.map(index => input[index]).concat(sumPair);
    }
  }
  return [];
}

var __dirname = path.dirname(fileURLToPath(import.meta.url));

var input = readInputFileToArray(path.join(__dirname, '../input.txt')).map(Number);

console.log('Sum of 2020 from 2 Addends')
var sumArray = findSumOfX(input, 2020, 2);
if (sumArray.length > 0) {
  console.log(sumArray);
  console.log(sumArray.reduce((accum, currVal) => accum * currVal));
}

console.log('Sum of 2020 from 3 Addends')
var sumArray = findSumOfX(input, 2020, 3);
if (sumArray.length > 0) {
  console.log(sumArray);
  console.log(sumArray.reduce((accum, currVal) => accum * currVal));
}