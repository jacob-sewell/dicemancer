const { flanking, haste, prayer } = require("../modifiers");
const ac = 20;
const dr = 20;
const damageModifier = 7;
const damageFloor = 0;

const bearClaw = {
  name: "claw",
  attackModifier: 12,
  damageModifier,
  dice: [{ count: 1, size: 6 }],
};
const bearBite = {
  name: "bite",
  attackModifier: 12,
  damageModifier,
  dice: [{ count: 1, size: 8 }],
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

const flamingFistDice = [{ count: 1, size: 6 }];
const shamblySlam = {
  name: "slam",
  attackModifier: 12,
  damageModifier: damageModifier + 1,
  dice: [{ count: 2, size: 6 }],
};
const bigRockSlam = {
  name: "slam",
  attackModifier: 12,
  damageModifier: damageModifier + 1,
  dice: [{ count: 2, size: 6 }],
};

const testCases = [
  {
    name: "Fire Bear (minimal mods)",
    attacks: [bearClaw, bearClaw, bearBite],
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Bear (haste)",
    attacks: [bearClaw, bearClaw, bearBite, bearBite].map(haste),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Bear (flanking)",
    attacks: [bearClaw, bearClaw, bearBite],
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Bear (haste, flanking)",
    attacks: [bearClaw, bearClaw, bearBite, bearBite],
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Bear (prayer)",
    attacks: [bearClaw, bearClaw, bearBite].map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Bear (haste, prayer)",
    attacks: [bearClaw, bearClaw, bearBite, bearBite].map(prayer).map(haste),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Bear (flanking, prayer)",
    attacks: [bearClaw, bearClaw, bearBite].map(flanking).map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Bear (haste, flanking, prayer)",
    attacks: [bearClaw, bearClaw, bearBite, bearBite]
      .map(haste)
      .map(flanking)
      .map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (minimal mods)",
    attacks: [elephantGore, elephantSlam],
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (haste)",
    attacks: [elephantGore, elephantGore, elephantSlam].map(haste),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (flanking)",
    attacks: [elephantGore, elephantSlam].map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (haste, flanking)",
    attacks: [elephantGore, elephantGore, elephantSlam]
      .map(haste)
      .map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (prayer)",
    attacks: [elephantGore, elephantSlam].map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (haste, prayer)",
    attacks: [elephantGore, elephantGore, elephantSlam].map(haste).map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (flanking, prayer)",
    attacks: [elephantGore, elephantSlam].map(flanking).map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Fire Elephant (haste, flanking, prayer)",
    attacks: [elephantGore, elephantGore, elephantSlam]
      .map(haste)
      .map(flanking)
      .map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (minimal mods)",
    attacks: [shamblySlam, shamblySlam],
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (prayer)",
    attacks: [shamblySlam, shamblySlam].map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (haste)",
    attacks: [shamblySlam, shamblySlam, shamblySlam].map(haste),
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (haste, prayer)",
    attacks: [shamblySlam, shamblySlam, shamblySlam].map(haste).map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (flanking)",
    attacks: [shamblySlam, shamblySlam].map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (prayer, flanking)",
    attacks: [shamblySlam, shamblySlam].map(prayer).map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (haste, flanking)",
    attacks: [shamblySlam, shamblySlam, shamblySlam].map(haste).map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Shambling Mound (haste, prayer, flanking)",
    attacks: [shamblySlam, shamblySlam, shamblySlam]
      .map(haste)
      .map(prayer)
      .map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (minimal mods)",
    attacks: [bigRockSlam, bigRockSlam],
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (prayer)",
    attacks: [bigRockSlam, bigRockSlam].map(prayer),
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (haste)",
    attacks: [bigRockSlam, bigRockSlam, bigRockSlam].map(haste),
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (prayer, haste)",
    attacks: [bigRockSlam, bigRockSlam, bigRockSlam].map(prayer).map(haste),
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (flanking)",
    attacks: [bigRockSlam, bigRockSlam].map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (prayer, flanking)",
    attacks: [bigRockSlam, bigRockSlam].map(prayer).map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (haste, flanking)",
    attacks: [bigRockSlam, bigRockSlam, bigRockSlam].map(haste).map(flanking),
    bonusDice: flamingFistDice,
  },
  {
    name: "Large Earth Elemental (prayer, haste, flanking)",
    attacks: [bigRockSlam, bigRockSlam, bigRockSlam]
      .map(prayer)
      .map(haste)
      .map(flanking),
    bonusDice: flamingFistDice,
  },
];
module.exports = { ac, dr, damageFloor, testCases };
