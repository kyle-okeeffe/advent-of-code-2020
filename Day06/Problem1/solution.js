import path from 'path';
import { fileURLToPath } from 'url';
import { chunkInputOnEmptyStrings, readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = chunkInputOnEmptyStrings(
  readInputFileToArray(path.join(__dirname, '../input.txt')));

const groupYesAnswers = (group) => {
  const uniqueYes = group[0].split('');
  for (let i = 1; i < group.length; i++) {
    for (const ans of group[i]) {
      if (!uniqueYes.includes(ans)) {
        uniqueYes.push(ans);
      }
    };
  }
  return uniqueYes;
};

const getFlightYesAnswersSumByGroup = (groups) => {
  return groups.reduce((acc, curr) => {
    return acc + groupYesAnswers(curr).length;
  }, 0);
};

console.log('Sum of unique group yes answers: ', getFlightYesAnswersSumByGroup(input));
