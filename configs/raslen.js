const { flanking, haste, prayer, sneakAttack } = require("../modifiers");
const ac = 20;
const dr = 20;
const damageModifier = 7;
const damageFloor = 0;

const sneakAttackDice = 4;
const tigerClaw = {
  name: "claw",
  dice: [{ count: 2, size: 4 }],
  attackModifier: 12,
  damageModifier,
};
const tigerBite = {
  name: "bite",
  dice: [{ count: 2, size: 6 }],
  attackModifier: 12,
  damageModifier,
};
const elephantGore = {
  name: "gore",
  dice: [{ count: 2, size: 8 }],
  attackModifier: 12,
  damageModifier: damageModifier + 1,
};
const elephantSlam = {
  name: "slam",
  dice: [{ count: 2, size: 6 }],
  attackModifier: 12,
  damageModifier: damageModifier + 1,
};

const testCases = [
  {
    name: "Dire Tiger (minimal mods)",
    attacks: [tigerClaw, tigerClaw, tigerBite],
    bonusDice: [],
  },
  {
    name: "Dire Tiger (haste)",
    attacks: [tigerClaw, tigerClaw, tigerBite, tigerBite].map(haste),
    bonusDice: [],
  },
  {
    name: "Dire Tiger (sneak attack)",
    attacks: [tigerClaw, tigerClaw, tigerBite]
      .map(flanking)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
  {
    name: "Dire Tiger (haste, sneak attack)",
    attacks: [tigerClaw, tigerClaw, tigerBite, tigerBite]
      .map(haste)
      .map(flanking)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
  {
    name: "Dire Tiger (prayer)",
    attacks: [tigerClaw, tigerClaw, tigerBite].map(prayer),
    bonusDice: [],
  },
  {
    name: "Dire Tiger (haste, prayer)",
    attacks: [tigerClaw, tigerClaw, tigerBite, tigerBite]
      .map(haste)
      .map(prayer),
    bonusDice: [],
  },
  {
    name: "Dire Tiger (sneak attack, prayer)",
    attacks: [tigerClaw, tigerClaw, tigerBite]
      .map(flanking)
      .map(prayer)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
  {
    name: "Dire Tiger (haste, sneak attack, prayer)",
    attacks: [tigerClaw, tigerClaw, tigerBite, tigerBite]
      .map(haste)
      .map(flanking)
      .map(prayer)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
  {
    name: "Elephant (minimal mods)",
    attacks: [elephantGore, elephantSlam],
    bonusDice: [],
  },
  {
    name: "Elephant (haste)",
    attacks: [elephantGore, elephantGore, elephantSlam].map(haste),
    bonusDice: [],
  },
  {
    name: "Elephant (sneak attack)",
    attacks: [elephantGore, elephantSlam]
      .map(flanking)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
  {
    name: "Elephant (haste, sneak attack)",
    attacks: [elephantGore, elephantGore, elephantSlam]
      .map(haste)
      .map(flanking)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
  {
    name: "Elephant (prayer)",
    attacks: [elephantGore, elephantSlam].map(prayer),
    bonusDice: [],
  },
  {
    name: "Elephant (haste, prayer)",
    attacks: [elephantGore, elephantGore, elephantSlam].map(haste).map(prayer),
    bonusDice: [],
  },
  {
    name: "Elephant (sneak attack, prayer)",
    attacks: [elephantGore, elephantSlam]
      .map(flanking)
      .map(prayer)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
  {
    name: "Elephant (haste, sneak attack, prayer)",
    attacks: [elephantGore, elephantGore, elephantSlam]
      .map(haste)
      .map(flanking)
      .map(prayer)
      .map(sneakAttack(sneakAttackDice)),
    bonusDice: [],
  },
];
module.exports = { ac, dr, damageFloor, testCases };
