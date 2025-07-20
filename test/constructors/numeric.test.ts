import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// fromNumeric

it("makes a simple fraction over 1 from a bigint", () => {
    let result = Fraction.fromNumeric(5n);
    expect(result.numerator).toBe(5n);
    expect(result.denominator).toBe(1n);

    result = Fraction.fromNumeric(-5n);
    expect(result.numerator).toBe(-5n);
    expect(result.denominator).toBe(1n);
});

it("supports bigint values larger than the max safe integer", () => {
    const big_bigint = BigInt(Number.MAX_SAFE_INTEGER) + 1000n;
    let result = Fraction.fromNumeric(big_bigint);
    expect(result.numerator).toBe(big_bigint);
    expect(result.denominator).toBe(1n);

    result = Fraction.fromNumeric(-big_bigint);
    expect(result.numerator).toBe(-big_bigint);
    expect(result.denominator).toBe(1n);
});

it("supports bigint values larger than the maximum js number", () => {
    const overflow = BigInt("9".repeat(310));
    expect(Number(overflow)).toBe(Infinity);

    let result = Fraction.fromNumeric(overflow);
    expect(result.numerator).toBe(overflow);
    expect(result.denominator).toBe(1n);

    result = Fraction.fromNumeric(-overflow);
    expect(result.numerator).toBe(-overflow);
    expect(result.denominator).toBe(1n);
});


it("simply works for an integer", () => {
    let result = Fraction.fromNumeric(5);
    expect(result.numerator).toBe(5n);
    expect(result.denominator).toBe(1n);

    result = Fraction.fromNumeric(-5);
    expect(result.numerator).toBe(-5n);
    expect(result.denominator).toBe(1n);
});

it("works for unsafe integers", () => {
    const number = Number.MAX_SAFE_INTEGER + 1000;
    let result = Fraction.fromNumeric(number);
    expect(result.numerator).toBe(BigInt(number));
    expect(result.denominator).toBe(1n);

    result = Fraction.fromNumeric(-number);
    expect(result.numerator).toBe(BigInt(-number));
    expect(result.denominator).toBe(1n);
});

it("works for an exactly representable float", () => {
    let result = Fraction.fromNumeric(0.625);
    expect(result.numerator).toBe(5n);
    expect(result.denominator).toBe(8n);

    result = Fraction.fromNumeric(-0.625);
    expect(result.numerator).toBe(-5n);
    expect(result.denominator).toBe(8n);
});

const DIGITS = "0123456789";
function randDigit(): string {
    return DIGITS[Math.floor(Math.random() * DIGITS.length)];
}
it("works for random floats", () => {
    const strSmall = "." + "0".repeat(Math.floor(Math.random() * 50)) + Array.from({ length: 15 }, randDigit).join("");
    const smallNumber = +strSmall;
    expect(Number.isNaN(smallNumber)).toBe(false);
    let result = Fraction.fromNumeric(smallNumber);
    expect(Number(result.numerator) / Number(result.denominator)).toBeCloseTo(smallNumber, 15);

    const strMid = Array.from({ length: 8 }, randDigit).join("") + "." + Array.from({ length: 15 }, randDigit).join("");
    const midNumber = +strMid;
    expect(Number.isNaN(midNumber)).toBe(false);
    result = Fraction.fromNumeric(midNumber);
    expect(Number(result.numerator) / Number(result.denominator)).toBeCloseTo(midNumber, 15);

    const strBig = Array.from({ length: 15 }, randDigit).join("") + "0".repeat(Math.floor(Math.random() * 50));
    const bigNumber = +strBig;
    expect(Number.isNaN(bigNumber)).toBe(false);
    result = Fraction.fromNumeric(bigNumber);
    expect(Number(result.numerator) / Number(result.denominator)).toBeCloseTo(bigNumber, 15);
});


it("throws for NaN", () => {
    expect(() => Fraction.fromNumeric(NaN)).toThrow(TypeError);
});

it("throws for Infinity", () => {
    expect(() => Fraction.fromNumeric(Infinity)).toThrow(TypeError);
    expect(() => Fraction.fromNumeric(-Infinity)).toThrow(TypeError);
});
