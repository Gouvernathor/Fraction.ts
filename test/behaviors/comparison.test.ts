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

it("should compare infinities correctly", () => {
    expect(Fraction.compare(Infinity, Infinity)).toBe(0);
    expect(Fraction.compare(Infinity, -Infinity)).toBe(1);
    expect(Fraction.compare(-Infinity, Infinity)).toBe(-1);
    expect(Fraction.compare(-Infinity, -Infinity)).toBe(0);
});

it("should compare with infinities correctly", () => {
    const pos = Fraction(54, 23);
    const neg = Fraction(-43, 27);

    expect(pos.compareTo(Infinity)).toBe(-1);
    expect(Fraction.compare(pos, Infinity)).toBe(-1);
    expect(pos.equals(Infinity)).toBe(false);
    expect(pos.lt(Infinity)).toBe(true);
    expect(pos.lte(Infinity)).toBe(true);
    expect(pos.gt(Infinity)).toBe(false);
    expect(pos.gte(Infinity)).toBe(false);

    expect(neg.compareTo(Infinity)).toBe(-1);
    expect(Fraction.compare(neg, Infinity)).toBe(-1);
    expect(neg.equals(Infinity)).toBe(false);
    expect(neg.lt(Infinity)).toBe(true);
    expect(neg.lte(Infinity)).toBe(true);
    expect(neg.gt(Infinity)).toBe(false);
    expect(neg.gte(Infinity)).toBe(false);

    expect(pos.compareTo(-Infinity)).toBe(1);
    expect(Fraction.compare(pos, -Infinity)).toBe(1);
    expect(pos.equals(-Infinity)).toBe(false);
    expect(pos.lt(-Infinity)).toBe(false);
    expect(pos.lte(-Infinity)).toBe(false);
    expect(pos.gt(-Infinity)).toBe(true);
    expect(pos.gte(-Infinity)).toBe(true);

    expect(neg.compareTo(-Infinity)).toBe(1);
    expect(Fraction.compare(neg, -Infinity)).toBe(1);
    expect(neg.equals(-Infinity)).toBe(false);
    expect(neg.lt(-Infinity)).toBe(false);
    expect(neg.lte(-Infinity)).toBe(false);
    expect(neg.gt(-Infinity)).toBe(true);
    expect(neg.gte(-Infinity)).toBe(true);
});
