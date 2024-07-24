const {
  secondary,
  twoWeaponPrimary,
  twoWeaponSecondary,
} = require("../modifiers");
const ac = 20;
const dr = 0;
const attackModifier = 10;
const damageModifier = 4;
const damageFloor = 0;

const longSword = {
  name: "longsword",
  attackModifier,
  damageModifier,
  dice: [{ count: 1, size: 8 }],
  threatRange: 2,
};
const greatSword = {
  name: "greatsword",
  attackModifier,
  damageModifier: Math.floor(damageModifier * 1.5),
  dice: [{ count: 2, size: 6 }],
  threatRange: 2,
};
const greatAxe = {
  name: "greataxe",
  attackModifier,
  damageModifier: Math.floor(damageModifier * 1.5),
  criticalMultiplier: 3,
  dice: [{ count: 1, size: 12 }],
};
const quarterstaff = {
  name: "quarterstaff",
  attackModifier,
  damageModifier,
  dice: [{ count: 1, size: 6 }],
};

const testCases = [
  {
    name: "Longswordsperson",
    attacks: [longSword, secondary(longSword)],
    bonusDice: [],
  },
  {
    name: "Greatswordsperson",
    attacks: [greatSword, secondary(greatSword)],
    bonusDice: [],
  },
  {
    name: "Greataxeperson",
    attacks: [greatAxe, secondary(greatAxe)],
    bonusDice: [],
  },
  {
    name: "Staffperson",
    attacks: [quarterstaff, secondary(quarterstaff)],
    bonusDice: [],
  },
  {
    name: "Staffperson 2WF",
    attacks: [
      twoWeaponPrimary(quarterstaff),
      secondary(twoWeaponPrimary(quarterstaff)),
      twoWeaponSecondary(quarterstaff),
    ],
    bonusDice: [],
  },
];
module.exports = { ac, dr, damageFloor, testCases };
