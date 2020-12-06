import path from 'path';
import { fileURLToPath } from 'url';
import { chunkInputOnEmptyStrings, readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = chunkInputOnEmptyStrings(
  readInputFileToArray(path.join(__dirname, '../input.txt')));

const groupSharedYesAnswers = (group) => {
  const sharedYes = group[0].split('');
  for (let i = 1; i < group.length; i++) {
    for (let j = sharedYes.length - 1; j >= 0; j--) {
      if (!group[i].includes(sharedYes[j])) {
        sharedYes.splice(j, 1);
      }
    }
  }
  return sharedYes;
};

const getFlightSharedYesAnswersSumByGroup = (groups) => {
  return groups.reduce((acc, curr) => {
    return acc + groupSharedYesAnswers(curr).length;
  }, 0);
};

console.log('Sum of unique group yes answers: ', getFlightSharedYesAnswersSumByGroup(input));
