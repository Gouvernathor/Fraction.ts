import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

const fractionEquals = Fraction(1, 1).equals;

// asIrreducible

it("reduces 0 to an irreducible fraction", () => {
    expect(Fraction(0).asIrreducible()).toSatisfy(fractionEquals.bind(Fraction(0, 1)));
});
it("reduces an irreducible fraction to itself", () => {
    expect(Fraction(1, 2).asIrreducible()).toSatisfy(fractionEquals.bind(Fraction(1, 2)));
    expect(Fraction(-1, 2).asIrreducible()).toSatisfy(fractionEquals.bind(Fraction(-1, 2)));
});
it("reduces a fraction marked as irreducible to the same object", () => {
    const irreducible = Fraction(1, 2).asIrreducible();
    expect(irreducible.asIrreducible()).toBe(irreducible);
});

const bigPrime = /* 2n ** 136279841n - 1n; */ 170141183460469231731687303715884105727n;
it("reduces a reducible fraction to an irreducible one", () => {
    expect(Fraction(bigPrime*2n, bigPrime).asIrreducible())
        .toSatisfy(fractionEquals.bind(Fraction(2, 1)));
    expect(Fraction(bigPrime*2n, -bigPrime).asIrreducible())
        .toSatisfy(fractionEquals.bind(Fraction(-2, 1)));
});

// limitDenominator

it("limits the denominator of a fraction to a provided maximum value", () => {
    const pi = Fraction("3.1415926535897932");
    expect(pi.limitDenominator(10000n)).toSatisfy(fractionEquals.bind(Fraction(355, 113)));
    expect(pi.neg().limitDenominator(10000n)).toSatisfy(fractionEquals.bind(Fraction(-355, 113)));
    expect(pi.limitDenominator(113n)).toSatisfy(fractionEquals.bind(Fraction(355, 113)));
    expect(pi.limitDenominator(112n)).toSatisfy(fractionEquals.bind(Fraction(333, 106)));
    expect(Fraction(201, 200).limitDenominator(100n)).toSatisfy(fractionEquals.bind(Fraction(1)));
    expect(Fraction(201, 200).limitDenominator(101n)).toSatisfy(fractionEquals.bind(Fraction(102, 101)));
    expect(Fraction(0).limitDenominator(10000n)).toSatisfy(fractionEquals.bind(Fraction(0)));
});
it("doesn't allow the denominator limit to be less than 1", () => {
    expect(() => Fraction(1).limitDenominator(0n)).toThrowError();
    expect(() => Fraction(1).limitDenominator(-1n)).toThrowError();
});

// simplify

it("simplifies a fraction to lower terms within a given precision bound", () => {
    const fraction = Fraction(415, 93);
    // test the strict equality of the terms, not the equality of the fraction
    expect(fraction.simplify(".1")).toEqual(Fraction(9, 2));
    expect(fraction.simplify(".01")).toEqual(Fraction(58, 13));
    expect(fraction.simplify(".0001")).toEqual(Fraction(415, 93));
});
