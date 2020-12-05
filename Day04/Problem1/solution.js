import path from 'path';
import { fileURLToPath } from 'url';
import { chunkInputOnEmptyStrings, readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = chunkInputOnEmptyStrings(
  readInputFileToArray(path.join(__dirname, '../input.txt')));

const isValidPassport = (passport) => {
  const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ];
  const passportFields = Object.keys(passport);
  return !requiredFields.some(field => !passportFields.includes(field));
};

const parsePassport = (passportLines) => {
  const passport = {};
  for (const line of passportLines) {
    line.split(' ').forEach(field => {
      const parts = field.split(':');
      passport[parts[0]] = parts[1];
    });
  }
  return passport;
};

const countValidPassports = (input) => {
  return input.reduce((acc, curr) => {
    return acc + isValidPassport(parsePassport(curr));
  }, 0);
};

console.log('Number of valid passports: ', countValidPassports(input));
