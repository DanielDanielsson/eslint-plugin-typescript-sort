import naturalCompare from "natural-compare-lite";

import { indexSignature } from "./common";

const charCompare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }

  if (b < a) {
    return 1;
  }

  return 0;
};

const getWeight = (value: string) => {
  switch (true) {
    // Custom name for index signature used here
    case indexSignature.regex.test(value):
      return 100;
    default:
      return 0;
  }
};

const weightedCompare = (
  a: string,
  b: string,
  compareFn: (a: string, b: string) => number
) => compareFn(a, b) - getWeight(a) + getWeight(b);

const ascending = (a: string, b: string) => weightedCompare(a, b, charCompare);

const ascendingInsensitive = (a: string, b: string) =>
  weightedCompare(a.toLowerCase(), b.toLowerCase(), charCompare);

const ascendingNatural = (a: string, b: string) =>
  weightedCompare(a, b, naturalCompare as (a: string, b: string) => number);

const ascendingInsensitiveNatural = (a: string, b: string) =>
  weightedCompare(
    a.toLowerCase(),
    b.toLowerCase(),
    naturalCompare as (a: string, b: string) => number
  );

/**
 * Functions which check that the given 2 names are in specific order.
 */
export const compareFn =
  (isAscending: boolean, isInsensitive: boolean, isNatural: boolean) =>
  (...args: [string?, string?]) => {
    if (args.filter(Boolean).length !== 2) {
      return 0;
    }

    const input = (isAscending ? args : args.reverse()) as [string, string];

    if (isInsensitive && isNatural) {
      return ascendingInsensitiveNatural(...input);
    }

    if (!isInsensitive && isNatural) {
      return ascendingNatural(...input);
    }

    if (isInsensitive && !isNatural) {
      return ascendingInsensitive(...input);
    }

    return ascending(...input);
  };
