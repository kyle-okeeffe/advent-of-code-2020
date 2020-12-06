import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'));

const getRow = (rowExp) => {
  return parseInt(rowExp.replace(/F/g, '0').replace(/B/g, '1'), 2);
};
const getColumn = (colExp) => {
  return parseInt(colExp.replace(/L/g, '0').replace(/R/g, '1'), 2);
};
const getSeatId = (row, column) => row * 8 + column;

const getMySeat = (input) => {
  const bookedSeats = [];
  input.forEach(seatExp => {
    const row = getRow(seatExp.slice(0, 7));
    const col = getColumn(seatExp.slice(7));
    const seatId = getSeatId(row, col);
    bookedSeats.push(seatId);
  });
  bookedSeats.sort((a, b) => a - b);
  for (let i = 0; i < bookedSeats.length - 1; i++) {
    if (bookedSeats[i + 1] - bookedSeats[i] === 2) {
      return bookedSeats[i] + 1;
    }
  }
};

console.log('My seat id: ', getMySeat(input));
