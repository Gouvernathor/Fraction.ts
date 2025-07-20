import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// fromAny
// wildcard

it("passes fraction objects through", () => {
    const fraction = Fraction(1, 2);
    expect(Fraction.fromAny(fraction)).toBe(fraction);
    expect(Fraction(fraction)).toBe(fraction);
});

it("accepts tuples and objects", () => {
    let fraction = Fraction.fromAny([1, 2]);
    expect(fraction.numerator).toBe(1n);
    expect(fraction.denominator).toBe(2n);

    fraction = Fraction([1, 2]);
    expect(fraction.numerator).toBe(1n);
    expect(fraction.denominator).toBe(2n);

    fraction = Fraction.fromAny({ numerator: 1n, denominator: 2n });
    expect(fraction.numerator).toBe(1n);
    expect(fraction.denominator).toBe(2n);

    fraction = Fraction({ numerator: 1n, denominator: 2n });
    expect(fraction.numerator).toBe(1n);
    expect(fraction.denominator).toBe(2n);
});

it("accepts bigints", () => {
    let fraction = Fraction.fromAny(16874385n);
    expect(fraction.numerator).toBe(16874385n);
    expect(fraction.denominator).toBe(1n);

    fraction = Fraction(16874385n);
    expect(fraction.numerator).toBe(16874385n);
    expect(fraction.denominator).toBe(1n);
});

it("accepts numbers", () => {
    let fraction = Fraction.fromAny(0.625);
    expect(fraction.numerator).toBe(5n);
    expect(fraction.denominator).toBe(8n);

    fraction = Fraction(0.625);
    expect(fraction.numerator).toBe(5n);
    expect(fraction.denominator).toBe(8n);
});

it("accepts strings", () => {
    let fraction = Fraction.fromAny("4 5/8");
    expect(fraction.numerator).toBe(37n);
    expect(fraction.denominator).toBe(8n);

    fraction = Fraction("4 5/8");
    expect(fraction.numerator).toBe(37n);
    expect(fraction.denominator).toBe(8n);

    fraction = Fraction.fromAny("0.625");
    expect(fraction.numerator).toBe(625n);
    expect(fraction.denominator).toBe(1000n);

    fraction = Fraction("0.625");
    expect(fraction.numerator).toBe(625n);
    expect(fraction.denominator).toBe(1000n);
});

it("accepts pairs", () => {
    let fraction = Fraction(1, 2);
    expect(fraction.numerator).toBe(1n);
    expect(fraction.denominator).toBe(2n);

    fraction = Fraction(-1, -2);
    expect(fraction.numerator).toBe(1n);
    expect(fraction.denominator).toBe(2n);

    fraction = Fraction(-1, 2);
    expect(fraction.numerator).toBe(-1n);
    expect(fraction.denominator).toBe(2n);

    fraction = Fraction(1, -2);
    expect(fraction.numerator).toBe(-1n);
    expect(fraction.denominator).toBe(2n);
});
