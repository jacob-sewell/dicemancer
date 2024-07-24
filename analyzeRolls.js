function analyzeRolls(options) {
  const {
    attackModifier,
    damageModifier,
    threatRange,
    ac,
    dr,
    damageFloor,
    dice,
  } = {
    attackModifier: 0,
    damageModifier: 0,
    threatRange: 1,
    criticalMultiplier: 2,
    ac: 20,
    dr: 0,
    damageFloor: 0,
    dice: [],
    ...options,
  };
  const criticalMultiplier = options.criticalMultiplier || 2;
  let rolls = [];
  const hitChance =
    Math.min(19, Math.max(1, 20 - (ac - attackModifier - 1))) / 20;
  const critChance = hitChance * (threatRange / 20);

  dice.forEach(({ count, size, multiplierOverride }) => {
    // In here we are building an array of all possible rolls on the given set of dice.
    for (let i = 0; i < count; i++) {
      if (rolls.length === 0) {
        rolls = Array(size)
          .fill(0)
          .map((_, face) => [
            // The 0th spot in every roll is the extra damage from a crit.
            // Accumulating it here lets us keep track of dice that should not be multiplied.
            (face + 1) * ((multiplierOverride || criticalMultiplier) - 1),
            face + 1,
          ]);
      } else {
        rolls = Array(size)
          .fill(0)
          .reduce((ret, _, face) => {
            return [
              ...ret,
              ...rolls.map((v) => {
                const newRoll = [...v, face + 1];
                newRoll[0] += // accumulate extra crit damage
                  (face + 1) * ((multiplierOverride || criticalMultiplier) - 1);
                return newRoll;
              }),
            ];
          }, []);
      }
    }
  });

  const moddedTotals = rolls.map(([rawCritDamage, ...dieResults]) => {
    const rawTotal = dieResults.reduce((a, b) => a + b);
    const moddedTotal = Math.max(rawTotal + damageModifier - dr, damageFloor);
    const moddedCritTotal = Math.max(
      rawCritDamage + rawTotal + damageModifier * criticalMultiplier - dr,
      damageFloor
    );
    return { moddedCritTotal, moddedTotal };
  });

  const maxTotal = Math.max(
    ...moddedTotals.map(({ moddedCritTotal }) => moddedCritTotal)
  );
  const minTotal = Math.min(
    ...moddedTotals.map(({ moddedTotal }) => moddedTotal)
  );
  const meanTotal =
    moddedTotals.map(({ moddedTotal }) => moddedTotal).reduce((a, b) => a + b) /
    moddedTotals.length;
  const meanPerRound =
    moddedTotals.reduce(
      (a, b) =>
        a +
        (hitChance - critChance) * b.moddedTotal +
        critChance * b.moddedCritTotal,
      0
    ) / moddedTotals.length;

  return {
    maxTotal,
    minTotal,
    meanTotal,
    meanPerRound,
  };
}

module.exports = analyzeRolls;
