import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const instructions = readInputFileToArray(path.join(__dirname, '../input.txt'))
  .map(instruction => {
    return {
      action: instruction[0],
      value: Number(instruction.slice(1))
    };
  });

// class Directions {
//   static north = new Directions('North');
//   static south = new Directions('South');
//   static west = new Directions('West');
//   static east = new Directions('East');

//   constructor(name) {
//     this.name = name;
//   }

//   toString() {
//     return this.name;
//   }
// }

class Ferry {
  static directions = {
    north: 0,
    east: 1,
    south: 2,
    west: 3
  };

  constructor(direction) {
    this.position = {
      x: 0,
      y: 0
    };
    this.direction = direction;
  }

  move(direction, distance) {
    switch (direction) {
      case Ferry.directions.north:
        this.position['y'] += distance;
        break;
      case Ferry.directions.south:
        this.position['y'] -= distance;
        break;
      case Ferry.directions.west:
        this.position['x'] -= distance;
        break;
      case Ferry.directions.east:
        this.position['x'] += distance;
        break;
      default:
        throw Error;
    }
  }

  act(instruction) {
    switch (instruction['action']) {
      case 'R':
        this.direction = (this.direction + instruction['value'] / 90) % 4;
        break;
      case 'L':
        this.direction = (this.direction + 4 - (instruction['value'] / 90 % 4)) % 4;
        break;
      case 'F':
        this.move(this.direction, instruction['value']);
        break;
      case 'N':
        this.move(Ferry.directions.north, instruction['value']);
        break;
      case 'S':
        this.move(Ferry.directions.south, instruction['value']);
        break;
      case 'W':
        this.move(Ferry.directions.west, instruction['value']);
        break;
      case 'E':
        this.move(Ferry.directions.east, instruction['value']);
        break;
      default:
        throw Error;
    }
  }

  followInstructions(instructions) {
    instructions.forEach(instruction => {
      this.act(instruction);
    });
  }
}
const myFerry = new Ferry(Ferry.directions.east);
myFerry.followInstructions(instructions);
console.log(Math.abs(myFerry.position['x']) + Math.abs(myFerry.position['y']));
