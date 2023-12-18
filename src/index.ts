/**
 * Returns a random value given the input:
 * - If a number is provided, returns a random number between 1 and the number
 * - If two numbers are provided, returns a random number between the two numbers
 * - If an array is provided, returns a random value from the array
 * - If an array and a number, n, are provided, returns n random distinct values from the array
 */
export function random<T>(arr: T[]): T;
export function random<T>(arr: T[], select: number): T[];
export function random(low: number, high?: number): number;
export function random<T>(x: number | T[], y?: number): number | T | T[] {
  if (typeof x === "number" && typeof y === "number" && x > y) {
    throw new Error(`${y} is greater than ${x}`);
  }
  if (x instanceof Array && isNotUndefined(y) && y > x.length) {
    throw new Error(`Array is of size ${x.length}, which is less than ${y}`);
  }
  if (x instanceof Array) {
    if (y !== undefined) {
      return randomArrayValues(x);
    }
    const index = Math.floor(Math.random() * x.length);
    return x[index];
  } else {
    return compareNumber(x, y);
  }
}

function countDecimals(value: number): number {
  if (Math.floor(value) === value) return 0;
  return isNotUndefined(value) ? value.toString().split(".")[1].length : 0;
}

/**
 * Return a random number of distinct values from an array
 */
function randomArrayValues<T>(arr: T[], quantity = 1): T[] {
  const newArray: T[] = [];
  const values = [...arr];
  for (let i = 0; i <= quantity; i++) {
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
  // We need to add an offset to the random number to ensure
  // we get the correct number of digits and it is inclusive
  const offset = parseFloat(
    `0.${Array(digits - 1)
      .fill(0)
      .join("")}1`
  );
  return parseFloat(
    (high
      ? Math.random() * (high - low + offset) + low
      : Math.random() * low
    ).toFixed(digits)
  );
}

const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;
