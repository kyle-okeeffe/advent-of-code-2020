import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'));

const isValidPassword = (requirements, password) => {
  const keys = Object.keys(requirements);
  for (const key of keys) {
    if ((password[requirements[key].pos1] === key) +
        (password[requirements[key].pos2] === key) !== 1) {
      return false;
    }
  }
  return true;
};

const parseRequirementsWithPassword = (requirementsWithPassword) => {
  const req = {};
  const parts = requirementsWithPassword.split(':');
  const reqParts = parts[0].split(' ');
  const reqPositionParts = reqParts[0].split('-');
  req[reqParts[1]] = {
    pos1: reqPositionParts[0],
    pos2: reqPositionParts[1]
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
