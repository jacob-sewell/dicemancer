const analyzeRolls = require("./analyzeRolls");
const { attackToString } = require("./stringUtils");

let configFile = "default";
let isVerbose = true;

const args = process.argv;
while (args.length) {
  const arg = args.shift();
  switch (true) {
    case !!(arg && arg.match(/^--help$|^-h$/i)):
      console.table([
        {
          flag: "-c or --config",
          definition:
            "Follow with which file in ./configs to use for test cases and targets.",
        },
        {
          flag: "-v or --verbose",
          definition: "Follow with true or false to turn verbosity on or off.",
        },
        { flag: "-? or --help", definition: "Display this help text." },
      ]);
      process.exit(0);
      break;
    case !!(arg && arg.match(/^-c$|^--config$/i)):
      configFile = args.shift();
      break;
    case !!(arg && arg.match(/^-v$|^--verbose$/i)):
      const nextArg = args.shift();
      isVerbose = !!(nextArg && nextArg.match(/^true$|^1$/i));
      break;
  }
}

const { ac, dr, damageFloor, testCases } = require(`./configs/${configFile}`);

const testCaseResults = testCases.map(({ name, attacks, bonusDice }) => ({
  title:
    name +
    (isVerbose
      ? ` [${attacks
          .map((attack) => attackToString({ bonusDice, ...attack }))
          .join(" ")}]`
      : "") +
    ` vs AC ${ac} DR ${dr}`,
  ...attacks.reduce(
    (ret, { dice, attackModifier, damageModifier, criticalMultiplier }) => {
      const { meanPerRound, meanTotal, minTotal, maxTotal } = analyzeRolls({
        attackModifier,
        damageModifier,
        ac,
        dr,
        floor: damageFloor,
        dice: [...dice, ...bonusDice],
        criticalMultiplier,
      });
      ret.meanPerRound += meanPerRound;
      ret.meanTotal += meanTotal;
      ret.maxTotal += maxTotal;
      ret.minTotal += minTotal;
      return ret;
    },
    { meanPerRound: 0, meanTotal: 0, maxTotal: 0, minTotal: 0 }
  ),
}));

console.table(
  testCaseResults.sort(
    (a, b) =>
      1000 * (b.meanPerRound - a.meanPerRound) +
      100 * (b.meanTotal - a.meanTotal) +
      10 * (b.maxTotal - a.maxTotal) +
      b.minTotal -
      a.minTotal
  )
);
