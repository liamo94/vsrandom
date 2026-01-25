/**
 * Returns a random value given the input:
 * - If a number is provided, returns a random number between 1 and the number
 * - If two numbers are provided, returns a random number between the two numbers
 * - If an array is provided, returns a random value from the array
 * - If an array and a number, n, are provided, returns n random distinct values from the array
 */
export function random(): number;
export function random<T>(arr: T[]): T;
export function random<T>(arr: T[], select: number): T[];
export function random(low: number, high?: number): number;
export function random<T>(x?: number | T[], y?: number): number | T | T[] {
  if (!isNotUndefined(x)) {
    return Math.random();
  }
  if (typeof x === "number" && typeof y === "number" && x > y) {
    throw new Error(`${x} is greater than ${y}`);
  }
  if (x instanceof Array && isNotUndefined(y) && y > x.length) {
    throw new Error(`Array is of size ${x.length}, which is less than ${y}`);
  }
  if (x instanceof Array) {
    if (isNotUndefined(y)) {
      return randomArrayValues(x, y);
    }
    const index = Math.floor(Math.random() * x.length);
    return x[index];
  } else {
    if (typeof x === "number" && !isNotUndefined(y) && x < 1) {
      throw new Error(
        `Single number argument must be >= 1. Received ${x}. Use two arguments for negative ranges (e.g., random(-5, -1)).`
      );
    }
    return compareNumber(x, y);
  }
}

function countDecimals(value: number): number {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length;
}

/**
 * Generate a random float by converting to integers, doing exact integer math, then converting back.
 * This avoids floating point rounding issues that could produce values outside the specified range.
 */
function randomFloat({ low, high, digits }: { low: number, high?: number, digits: number }): number {
  const multiplier = Math.pow(10, digits);
  if (high !== undefined) {
    // Range case: random between low and high (inclusive)
    const lowInt = Math.round(low * multiplier);
    const highInt = Math.round(high * multiplier);
    const randomInt =
      Math.floor(Math.random() * (highInt - lowInt + 1)) + lowInt;
    return randomInt / multiplier;
  } else {
    // Single value case: random between 1 and low (matching integer behavior)
    const minInt = multiplier;
    const maxInt = Math.round(low * multiplier);
    const randomInt =
      Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
    return randomInt / multiplier;
  }
}

/**
 * Return a random number of distinct values from an array
 */
function randomArrayValues<T>(arr: T[], quantity = 1): T[] {
  const newArray: T[] = [];
  const values = [...arr];
  for (let i = 0; i <= quantity - 1; i++) {
    if (!values.length) break;
    const value = random(values);
    newArray.push(value);
    values.splice(values.indexOf(value), 1);
  }
  return newArray;
}

/**
 * We want to handle both floats and integers, so we need to count the number of decimals
 */
function compareNumber(low: number, high?: number): number {
  const digits = high
    ? Math.max(countDecimals(low), countDecimals(high))
    : countDecimals(low);

  if (digits === 0) {
    return high
      ? Math.floor(Math.random() * (high - low + 1)) + low
      : Math.floor(Math.random() * low) + 1;
  }

  return randomFloat({ low, high, digits });
}

const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;
