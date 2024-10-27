class FormulaError extends Error {
  constructor(message, formula, index) {
      super(message);
      this.name = "FormulaError";
      this.formula = formula;
      this.index = index;
  }
}

function parseFormula(formula, periodicTableDict) {
  if (typeof formula !== "string") {
      throw new Error(`wrong data type for parameter formula; formula is a ${typeof formula} but must be a string`);
  }
  if (typeof periodicTableDict !== "object" || periodicTableDict === null) {
      throw new Error(`wrong data type for parameter periodicTableDict; periodicTableDict is a ${typeof periodicTableDict} but must be an object`);
  }

  // Remove all spaces from the formula
  formula = formula.replace(/\s/g, '');

  function parseQuant(formula, index) {
      let quant = 1;
      if (index < formula.length && /^\d$/.test(formula[index])) {
          if (formula[index] === "0") {
              throw new FormulaError("invalid formula, quantity begins with zero (0), perhaps you meant to type capital O for Oxygen instead of zero", formula, index);
          }
          const start = index;
          index++;
          while (index < formula.length && /^\d$/.test(formula[index])) {
              index++;
          }
          quant = parseInt(formula.slice(start, index));
      }
      return [quant, index];
  }

  function getQuant(elemDict, symbol) {
      return symbol in elemDict ? elemDict[symbol] : 0;
  }

  function parseR(formula, index, level) {
      const startIndex = index;
      const startLevel = level;
      const elemDict = {};

      while (index < formula.length) {
          const ch = formula[index];
          if (ch === "(") {
              const [groupDict, newIndex] = parseR(formula, index + 1, level + 1);
              index = newIndex;
              const [quant, newIndex2] = parseQuant(formula, index);
              index = newIndex2;
              for (const symbol in groupDict) {
                  const prev = getQuant(elemDict, symbol);
                  const curr = prev + groupDict[symbol] * quant;
                  elemDict[symbol] = curr;
              }
          } else if (/^[a-zA-Z]$/.test(ch)) {
              let symbol = formula.slice(index, index + 2);
              if (symbol in periodicTableDict) {
                  index += 2;
              } else {
                  symbol = formula[index];
                  if (symbol in periodicTableDict) {
                      index++;
                  } else {
                      throw new FormulaError(`invalid formula; unknown element symbol: ${symbol}`, formula, index);
                  }
              }
              const [quant, newIndex] = parseQuant(formula, index);
              index = newIndex;
              const prev = getQuant(elemDict, symbol);
              elemDict[symbol] = prev + quant;
          } else if (ch === ")") {
              if (level === 0) {
                  throw new FormulaError("invalid formula; unmatched close parenthesis", formula, index);
              }
              level--;
              index++;
              break;
          } else if (ch === "·") {  // Handling hydrates
              index++;
              const [quant, newIndex] = parseQuant(formula, index);
              index = newIndex;
              const [hydrateDict, newIndex2] = parseR(formula, index, level);
              index = newIndex2;
              for (const symbol in hydrateDict) {
                  const prev = getQuant(elemDict, symbol);
                  const curr = prev + hydrateDict[symbol] * quant;
                  elemDict[symbol] = curr;
              }
          } else {
              let message;
              if (/^\d$/.test(ch)) {
                  message = "invalid formula";
              } else {
                  message = `invalid formula; illegal character: ${ch}`;
              }
              throw new FormulaError(message, formula, index);
          }
      }

      if (level > 0 && level >= startLevel) {
          throw new FormulaError("invalid formula; unmatched open parenthesis", formula, startIndex - 1);
      }

      return [elemDict, index];
  }

  const [elemDict] = parseR(formula, 0, 0);
  return Object.entries(elemDict);
}