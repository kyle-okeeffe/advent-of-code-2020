import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'))
  .map(item => item.split(''));

/**
 * @param {number[]} seat - Represents the indexes of the seat
 * @param {number[][]} seatArrangement - A two dimensional array or seat arrangements
 * @return {string} Seat state. Empty string if an invalid index.
 */
const getSeatState = (seat, seatArrangement) => {
  if (seat[0] >= 0 && seat[0] < seatArrangement.length &&
    seat[1] >= 0 && seat[1] < seatArrangement[seat[0]].length) {
    return seatArrangement[seat[0]][seat[1]];
  }
  return '';
};

/**
 * @param {number[]} seat - Represents the indexes of the seat
 * @param {number[][]} seatArrangement - A two dimensional array or seat arrangements
 * @return {Object} The seat state of the adjacent seats
 */
const getVisibleSeatStats = (seat, seatArrangement) => {
  const stats = {
    '.': 0,
    L: 0,
    '#': 0
  };
  // The 8 offsets that define the adjacent seats
  [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ].forEach(offset => {
    let iter = 1;
    let state = '';
    do {
      state = getSeatState([seat[0] + offset[0] * iter, seat[1] + offset[1] * iter], seatArrangement);
      if (state.length === 1 && state !== '.') {
        stats[state]++;
        break;
      }
      iter++;
    } while (state !== '');
  });
  return stats;
};

/**
 * @param {number[][]} seatArrangement - A two dimensional array or seat arrangements
 * @return {Object} The seat states of all seats
 */
const getStateStats = seatArrangement => {
  const stats = {
    '.': 0,
    L: 0,
    '#': 0
  };
  seatArrangement.forEach(col => {
    col.forEach(seatState => {
      stats[seatState]++;
    });
  });
  return stats;
};

/**
 * @param {number[]} seat - Represents the indexes of the seat
 * @param {number[][]} seatArrangement - A two dimensional array or seat arrangements
 * @return {string} The change to be made.
 */
const seatingChange = (seat, seatArrangement) => {
  const seatState = getSeatState(seat, seatArrangement);
  const adjStats = getVisibleSeatStats(seat, seatArrangement);
  if (seatState === 'L' && adjStats['#'] === 0) {
    return '#';
  } else if (seatState === '#' && adjStats['#'] >= 5) {
    return 'L';
  }
  return '';
};

/**
 * @param {number[][]} seatArrangement - A two dimensional array or seat arrangements
 * @return {number} The number of changes applied to seatArrangement
 */
const applySeatingRules = seatArrangement => {
  const changes = [];
  for (let i = 0; i < seatArrangement.length; i++) {
    for (let j = 0; j < seatArrangement[i].length; j++) {
      const changeState = seatingChange([i, j], seatArrangement);
      if (changeState.length !== 0) {
        changes.push({
          indexes: [i, j],
          state: changeState
        });
      }
    }
  }
  changes.forEach(change => {
    seatArrangement[change.indexes[0]][change.indexes[1]] = change.state;
  });
  return changes.length;
};

/**
 * @param {number[][]} seatArrangement - A two dimensional array or seat arrangements
 * @return {number} The number of iterations
 */
const stabalizeSeating = seatArrangement => {
  let iters = 0;
  while (applySeatingRules(seatArrangement)) {
    iters++;
  }
  return iters;
};

stabalizeSeating(input);
console.log(getStateStats(input)['#']);
