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

const findLoop = (bootInstrs) => {
  const instrs = bootInstrs.map(instr => [instr, 0]);
  let accumulator = 0;
  let iter = 0;
  while (iter < instrs.length) {
    const instr = instrs[iter];
    if (instr[1] === 1) {
      return false;
    }
    const diff = evalInstr(instr[0]);
    iter += diff[0];
    accumulator += diff[1];
    instr[1]++;
  }
  return accumulator;
};

const jmpNopSwitch = (instr) => {
  if (instr.op === 'jmp') {
    instr.op = 'nop';
  } else if (instr.op === 'nop') {
    instr.op = 'jmp';
  }
};

const fixLoop = (bootInstrs) => {
  for (let i = 0; i < bootInstrs.length; i++) {
    const instr = bootInstrs[i];
    if (instr.op === 'acc') {
      continue;
    }
    jmpNopSwitch(instr);
    const loopResult = findLoop(bootInstrs);
    if (loopResult !== false) {
      return loopResult;
    }
    jmpNopSwitch(instr);
  }
};

const bootInstrs = input.map(op => parseInstr(op));
console.log(fixLoop(bootInstrs));
