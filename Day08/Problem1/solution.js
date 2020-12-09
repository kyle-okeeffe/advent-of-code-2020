import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'));

const parseInstr = (instrPhrase) => {
  const parsed = instrPhrase.match(/^(?<op>[a-z]+) (?<sign>[+-])(?<value>\d+)$/).groups;
  return {
    op: parsed.op,
    value: parsed.sign === '-' ? Number(parsed.value) * -1 : Number(parsed.value)
  };
};

const evalInstr = (instr) => {
  if (instr.op === 'nop') {
    return [1, 0];
  } else if (instr.op === 'acc') {
    return [1, instr.value];
  } else if (instr.op === 'jmp') {
    return [instr.value, 0];
  }
};

const findLoop = (bootCode) => {
  const bootInstrs = bootCode.map(op => [parseInstr(op), 0]);
  let accumulator = 0;
  let iter = 0;
  while (iter < bootInstrs.length) {
    const instr = bootInstrs[iter];
    if (instr[1] === 1) {
      return accumulator;
    }
    const diff = evalInstr(instr[0]);
    iter += diff[0];
    accumulator += diff[1];
    instr[1]++;
  }
};

console.log(findLoop(input));
