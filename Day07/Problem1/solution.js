import path from 'path';
import { fileURLToPath } from 'url';
import { readInputFileToArray } from '../../utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = readInputFileToArray(path.join(__dirname, '../input.txt'));

const parseBagPhrase = (phrase) => {
  const bagDetails = phrase.match(/^(?<count>\d*?) ?(?<type>[\D ]+?) bags?\.?$/).groups;
  if (bagDetails.type === 'no other') {
    return {};
  }
  return {
    type: bagDetails.type,
    count: bagDetails.count !== '' ? Number(bagDetails.count) : 1
  };
};

const parseBagCondition = (condition) => {
  const conditionObj = { innerBags: [] };
  const parts = condition.split(' contain ');
  conditionObj.outerBag = parseBagPhrase(parts[0]).type;
  parts[1].split(', ').forEach(phrase => {
    const bagDetails = parseBagPhrase(phrase);
    if (Object.keys(bagDetails).length !== 0) {
      conditionObj.innerBags.push(bagDetails);
    }
  });
  return conditionObj;
};

const assembleBagConditions = (conditions) => {
  const conditionsObj = {};
  conditions.forEach(condition => {
    const parsedCond = parseBagCondition(condition);
    conditionsObj[parsedCond.outerBag] = {};
    conditionsObj[parsedCond.outerBag].innerBags = parsedCond.innerBags;
  });
  return conditionsObj;
};

const findInnerBagPath = (outerBagType, searchBagType, bagConditions) => {
  const innerBags = bagConditions[outerBagType].innerBags;
  const foundPathBagTypes = [];
  for (const bag of innerBags) {
    if (bag.type === searchBagType) {
      foundPathBagTypes.push(outerBagType);
    } else {
      const foundBags = findInnerBagPath(bag.type, searchBagType, bagConditions);
      foundPathBagTypes.push(...foundBags);
      if (foundBags.length > 0) {
        foundPathBagTypes.push(outerBagType);
      }
    }
  }
  return foundPathBagTypes;
};

const typesOfBagsContainingBagType = (searchBagType, bagConditions) => {
  const bagTypes = Object.keys(bagConditions);
  const containingTypes = [];
  for (const type of bagTypes) {
    if (!containingTypes.includes(type)) {
      const bags = findInnerBagPath(type, searchBagType, bagConditions);
      bags.forEach(bag => {
        if (!containingTypes.includes(bag)) {
          containingTypes.push(bag);
        }
      });
    }
  }
  return containingTypes;
};

console.log(typesOfBagsContainingBagType('shiny gold', assembleBagConditions(input)).length);
