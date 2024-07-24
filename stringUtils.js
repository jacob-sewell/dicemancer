function attackToString(options) {
  const {
    name,
    dice,
    bonusDice,
    attackModifier,
    damageModifier,
    threatRange,
    criticalMultiplier,
  } = {
    name: "",
    dice: [],
    bonusDice: [],
    attackModifier: 0,
    damageModifier: 0,
    threatRange: 1,
    criticalMultiplier: 2,
    ...options,
  };
  return `${name} ${modifierToString(attackModifier)} ${damagePoolToString({
    dice: [...dice, ...bonusDice],
    damageModifier,
  })} ${critToString({ threatRange, criticalMultiplier })}`;
}

function critToString({ threatRange, criticalMultiplier }) {
  if (criticalMultiplier >= 2) {
    const threatRangeBounds = [20];
    if (threatRange > 1) {
      threatRangeBounds.unshift(21 - threatRange);
    }
    const threatRangeStr = threatRangeBounds
      .map((n) => n.toString(10))
      .join("-");
    return `(${threatRangeStr}/x${criticalMultiplier})`;
  }
  return "";
}

function modifierToString(modifier) {
  switch (true) {
    case isNaN(modifier):
      return "+??";
    case modifier < 0:
      return `-${modifier}`;
    default:
      return `+${modifier}`;
  }
}

function damagePoolToString({ dice, damageModifier }) {
  return `${dice.map(countSizeToMdN).join("+")}+${damageModifier}`;
}

function countSizeToMdN({ count, size }) {
  return `${count}d${size}`;
}

module.exports = { attackToString, diceToString: damagePoolToString };
