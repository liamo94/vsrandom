import { describe, expect, it } from "vitest";
import { random } from ".";

describe("random", () => {
  it("Should handle single array", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = random(arr);
    expect(arr.includes(result)).toBe(true);
    expect(typeof result).toBe("number");
  });
  it("Should handle single item single array", () => {
    const arr = [4];
    const result = random(arr);
    expect(result).toBe(4);
  });
  it("Should handle single item single array (with variable)", () => {
    const arr = [4];
    const result = random(arr, 1);
    expect(result).toEqual([4]);
  });
  it("Should handle single array and number", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = random(arr, 2);
    result.forEach((r) => {
      expect(arr.includes(r)).toBe(true);
    });
    expect(result).toEqual(expect.any(Array));
    expect(result.length).toBe(2);
  });
  it("Should throw an error if array is too large", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(() => random(arr, 6)).toThrowError();
  });
  it("Should handle one random number", () => {
    const value = 10;
    const result = random(value);
    expect(result).toBeLessThanOrEqual(value);
  });
  it("Should handle one random number", () => {
    const low = 10;
    const high = 13;
    const result = random(low, high);
    expect(result).toBeLessThanOrEqual(high);
    expect(result).toBeGreaterThanOrEqual(low);
  });
  it("Should handle small case", () => {
    const low = 1;
    const high = 2;
    const result = random(low, high);
    expect([1, 2].includes(result)).toBe(true);
  });
  it("Should same number (low and high)", () => {
    const low = 1;
    const high = 1;
    const result = random(low, high);
    expect(result).toBe(1);
  });
  it("Should same number (low and high)", () => {
    const result = random(1);
    expect(result).toBe(1);
  });
  it("Should handle floats", () => {
    const low = 1.11;
    const high = 1.22;
    const result = random(low, high);
    expect(result).toBeLessThanOrEqual(high);
    expect(result).toBeGreaterThanOrEqual(low);
  });
  it("Should handle more floats", () => {
    const low = 0.11;
    const high = 1.2234;
    const result = random(low, high);
    expect(result).toBeLessThanOrEqual(high);
    expect(result).toBeGreaterThanOrEqual(low);
  });
  it("Should throw an error if low > high", () => {
    expect(() => random(5, 2)).toThrowError();
  });
});
