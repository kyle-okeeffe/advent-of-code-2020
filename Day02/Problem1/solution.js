import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'));

const isValidPassword = (requirements, password) => {
  const keys = Object.keys(requirements);
  const counts = {};
  keys.forEach(key => { counts[key] = 0; });
  for (const char of password) {
    if (keys.includes(char)) {
      counts[char]++;
    }
  }
  for (const key of keys) {
    if (counts[key] < requirements[key].min || counts[key] > requirements[key].max) {
      return false;
    }
  }
  return true;
};

const parseRequirementsWithPassword = (requirementsWithPassword) => {
  const req = {};
  const parts = requirementsWithPassword.split(':');
  const reqParts = parts[0].split(' ');
  const reqRangeParts = reqParts[0].split('-');
  req[reqParts[1]] = {
    min: reqRangeParts[0],
    max: reqRangeParts[1]
  };
  return [req, parts[1]];
};

const countValidPasswords = (input) => {
  let count = 0;
  input.forEach(passwordReqPhrase => {
    const reqAndPass = parseRequirementsWithPassword(passwordReqPhrase);
    if (isValidPassword(reqAndPass[0], reqAndPass[1])) {
      count++;
    }
  });
  console.log('Valid passwords: ', count);
};

countValidPasswords(input);
