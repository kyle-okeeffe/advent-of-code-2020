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
    this.waypoint = {
      x: 10,
      y: 1
    }
    this.direction = direction;
  }

  rotate(turns) {
    let rotation = turns < 0 ? -1 : 1;
    turns = Math.abs(turns);
    if (turns % 2 === 1) {
      if (turns === 3) {
        rotation *= -1;
      }
      const x = this.waypoint['x'];
      const y = this.waypoint['y'];
      this.waypoint['x'] = y * rotation;
      this.waypoint['y'] = x * -1 * rotation;
    }
    if (turns === 2) {
      this.waypoint['x'] *= -1;
      this.waypoint['y'] *= -1;
    }
  }

  moveWaypoint(direction, distance) {
    switch (direction) {
      case Ferry.directions.north:
        this.waypoint['y'] += distance;
        break;
      case Ferry.directions.south:
        this.waypoint['y'] -= distance;
        break;
      case Ferry.directions.west:
        this.waypoint['x'] -= distance;
        break;
      case Ferry.directions.east:
        this.waypoint['x'] += distance;
        break;
      default:
        throw Error;
    }
  }

  move(times) {
    this.position['x'] += this.waypoint['x'] * times;
    this.position['y'] += this.waypoint['y'] * times;
  }

  act(instruction) {
    switch (instruction['action']) {
      case 'R':
        this.rotate(instruction['value'] / 90 % 4);
        break;
      case 'L':
        this.rotate(instruction['value'] / 90 % 4 * -1);
        break;
      case 'F':
        this.move(instruction['value']);
        break;
      case 'N':
        this.moveWaypoint(Ferry.directions.north, instruction['value']);
        break;
      case 'S':
        this.moveWaypoint(Ferry.directions.south, instruction['value']);
        break;
      case 'W':
        this.moveWaypoint(Ferry.directions.west, instruction['value']);
        break;
      case 'E':
        this.moveWaypoint(Ferry.directions.east, instruction['value']);
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
