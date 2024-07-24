const { secondary } = require("../modifiers");
const ac = 20;
const dr = 20;
const damageFloor = 0;

const angryStaff = {
  name: "Staff",
  dice: [{ count: 3, size: 6 }],
  attackModifier: 23,
  damageModifier: 18,
};
const angryHalberd = {
  name: "Halberd",
  dice: [{ count: 3, size: 8 }],
  attackModifier: 21,
  damageModifier: 18,
  criticalMultiplier: 3,
};
const speedyStaff = { ...angryStaff, attackModifier: 16, damageModifier: 13 };
const testCases = [
  {
    name: "Fast Shawn w/ Staff",
    attacks: [
      speedyStaff,
      speedyStaff,
      speedyStaff,
      secondary(speedyStaff),
      secondary(speedyStaff),
    ],
    bonusDice: [],
  },
  {
    name: "Angry Shaun w/ Staff",
    attacks: [
      angryStaff,
      angryStaff,
      angryStaff,
      secondary(angryStaff),
      secondary(angryStaff),
    ],
    bonusDice: [],
  },
  {
    name: "Angry Shaun w/ Halberd",
    attacks: [angryHalberd, angryHalberd, secondary(angryHalberd)],
    bonusDice: [],
  },
];
module.exports = { ac, dr, damageFloor, testCases };
