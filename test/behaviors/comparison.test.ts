import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// compareTo, equals, lt, lte, gt, gte

it("should compare equal fractions correctly", () => {
    const a = Fraction(1, 2);
    const b = Fraction(2, 4);

    expect(a.compareTo(b)).toBe(0);
    expect(Fraction.compare(a, b)).toBe(0);
    expect(a.equals(b)).toBe(true);
    expect(a.lt(b)).toBe(false);
    expect(a.lte(b)).toBe(true);
    expect(a.gt(b)).toBe(false);
    expect(a.gte(b)).toBe(true);
});

it("should compare different fractions correctly", () => {
    const a = Fraction(1, 5);
    const b = Fraction(1, 2);

    expect(a.compareTo(b)).toBe(-1);
    expect(Fraction.compare(a, b)).toBe(-1);
    expect(a.equals(b)).toBe(false);
    expect(a.lt(b)).toBe(true);
    expect(a.lte(b)).toBe(true);
    expect(a.gt(b)).toBe(false);
    expect(a.gte(b)).toBe(false);

    expect(b.compareTo(a)).toBe(1);
    expect(Fraction.compare(b, a)).toBe(1);
    expect(b.equals(a)).toBe(false);
    expect(b.lt(a)).toBe(false);
    expect(b.lte(a)).toBe(false);
    expect(b.gt(a)).toBe(true);
    expect(b.gte(a)).toBe(true);
});
