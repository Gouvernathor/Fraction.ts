import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// ceil, floor, round, roundTo

it("rounds fractions to big integers correctly", () => {
    const zero = Fraction(0);
    expect(zero.ceil()).toBe(0n);
    expect(zero.floor()).toBe(0n);
    expect(zero.round()).toBe(0n);
    expect(zero.neg().ceil()).toBe(0n);
    expect(zero.neg().floor()).toBe(0n);
    expect(zero.neg().round()).toBe(0n);

    const subOne = Fraction("0.51");
    expect(subOne.ceil()).toBe(1n);
    expect(subOne.floor()).toBe(0n);
    expect(subOne.round()).toBe(1n);
    expect(subOne.neg().ceil()).toBe(0n);
    expect(subOne.neg().floor()).toBe(-1n);
    expect(subOne.neg().round()).toBe(-1n);

    const integer = Fraction(7);
    expect(integer.ceil()).toBe(7n);
    expect(integer.floor()).toBe(7n);
    expect(integer.round()).toBe(7n);
    expect(integer.neg().ceil()).toBe(-7n);
    expect(integer.neg().floor()).toBe(-7n);
    expect(integer.neg().round()).toBe(-7n);

    const big = Fraction(5343854684.35764854);
    expect(big.ceil()).toBe(5343854685n);
    expect(big.floor()).toBe(5343854684n);
    expect(big.round()).toBe(5343854684n);
    expect(big.neg().ceil()).toBe(-5343854684n);
    expect(big.neg().floor()).toBe(-5343854685n);
    expect(big.neg().round()).toBe(-5343854684n);

    const mid = Fraction("51648354.5");
    expect(mid.ceil()).toBe(51648355n);
    expect(mid.floor()).toBe(51648354n);
    expect(mid.round()).toBe(51648355n);
    expect(mid.neg().ceil()).toBe(-51648354n);
    expect(mid.neg().floor()).toBe(-51648355n);
    expect(mid.neg().round()).toBe(-51648354n); // towards +Inf, not away from zero, following JS rules
});

const fractionEquals = Fraction(1, 1).equals;

it("rounds fractions to multiples correctly", () => {
    expect(Fraction(".9").roundTo(Fraction(1, 8))).toSatisfy(fractionEquals.bind(Fraction(7, 8)));
});
