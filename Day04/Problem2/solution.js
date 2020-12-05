import path from 'path';
import { fileURLToPath } from 'url';
import { chunkInputOnEmptyStrings, readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = chunkInputOnEmptyStrings(
  readInputFileToArray(path.join(__dirname, '../input.txt')));

const isValidByr = (byr) => byr >= 1920 && byr <= 2002;
const isValidIyr = (iyr) => iyr >= 2010 && iyr <= 2020;
const isValidEyr = (eyr) => eyr >= 2020 && eyr <= 2030;
const isValidHcl = (hcl) => /^#[\da-fA-F]{6}$/.test(hcl);
const isValidPid = (pid) => /^\d{9}$/.test(pid);

const isValidHgt = (hgt) => {
  const match = hgt.match(/^(?<num>\d*)(?<unit>cm|in)$/);
  if (match) {
    if (match.groups.unit === 'cm') {
      return match.groups.num >= 150 && match.groups.num <= 193;
    } else {
      return match.groups.num >= 59 && match.groups.num <= 76;
    }
  }
  return false;
};

const isValidEcl = (ecl) => {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(col => col === ecl);
};

const isValidPassport = (passport) => {
  const requiredFieldValidators = {
    byr: isValidByr,
    iyr: isValidIyr,
    eyr: isValidEyr,
    hgt: isValidHgt,
    hcl: isValidHcl,
    ecl: isValidEcl,
    pid: isValidPid
  };
  return !Object.keys(requiredFieldValidators).some(field => {
    return !(passport[field] && requiredFieldValidators[field](passport[field]));
  });
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
