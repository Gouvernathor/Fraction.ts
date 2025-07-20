import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// readonly numerator
// readonly denominator

it("supports reading the numerator", () => {
  const fraction = Fraction(3, 4);
  expect(fraction.numerator).toBe(3n);
});

it("supports reading the denominator", () => {
  const fraction = Fraction(3, 4);
  expect(fraction.denominator).toBe(4n);
});
