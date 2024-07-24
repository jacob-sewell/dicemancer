const flanking = (attack) => ({
  ...attack,
  attackModifier: attack.attackModifier + 2,
});
const haste = (attack) => ({
  ...attack,
  attackModifier: attack.attackModifier + 1,
});
const prayer = (attack) => ({
  ...attack,
  attackModifier: attack.attackModifier + 1,
  damageModifier: attack.damageModifier + 1,
});
const secondary = (attack) => ({
  ...attack,
  attackModifier: attack.attackModifier - 5,
});
const sneakAttack = (sneakAttackDice) => (attack) => ({
  ...attack,
  dice: [
    ...attack.dice,
    { count: sneakAttackDice, size: 6, multiplierOverride: 1 },
  ],
});
const twoWeaponPrimary = (attack) => ({
  ...attack,
  attackModifier: attack.attackModifier - 2,
});
const twoWeaponSecondary = (attack) => ({
  ...twoWeaponPrimary(attack),
  damageModifier: Math.floor(attack.damageModifier / 2), // This is assuming the damage modifier is entirely from strength, which is a bad assumption.
});
module.exports = {
  flanking,
  haste,
  prayer,
  secondary,
  sneakAttack,
  twoWeaponPrimary,
  twoWeaponSecondary,
};
