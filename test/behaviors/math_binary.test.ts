import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

const fractionEquals = Fraction(1, 1).equals;

// add, sub, mul, div (with bigint too)
// mod

it("adds two fractions", () => {
    expect(Fraction(1, 2).add(Fraction(5, 8))).toSatisfy(fractionEquals.bind(Fraction(9, 8)));
    expect(Fraction(1, 2).add(Fraction(-5, 8))).toSatisfy(fractionEquals.bind(Fraction(-1, 8)));
    expect(Fraction(-1, 2).add(Fraction(5, 8))).toSatisfy(fractionEquals.bind(Fraction(1, 8)));
    expect(Fraction(-1, 2).add(Fraction(-5, 8))).toSatisfy(fractionEquals.bind(Fraction(-9, 8)));
});

it("subtracts two fractions", () => {
    expect(Fraction(1, 2).sub(Fraction(5, 8))).toSatisfy(fractionEquals.bind(Fraction(-1, 8)));
    expect(Fraction(1, 2).sub(Fraction(-5, 8))).toSatisfy(fractionEquals.bind(Fraction(9, 8)));
    expect(Fraction(-1, 2).sub(Fraction(5, 8))).toSatisfy(fractionEquals.bind(Fraction(-9, 8)));
    expect(Fraction(-1, 2).sub(Fraction(-5, 8))).toSatisfy(fractionEquals.bind(Fraction(1, 8)));
});

it("multiplies two fractions", () => {
    expect(Fraction(7, 8).mul(Fraction(5, 6))).toSatisfy(fractionEquals.bind(Fraction(35, 48)));
    expect(Fraction(7, 8).mul(Fraction(-5, 6))).toSatisfy(fractionEquals.bind(Fraction(-35, 48)));
    expect(Fraction(-7, 8).mul(Fraction(5, 6))).toSatisfy(fractionEquals.bind(Fraction(-35, 48)));
    expect(Fraction(-7, 8).mul(Fraction(-5, 6))).toSatisfy(fractionEquals.bind(Fraction(35, 48)));
});

it("divides two fractions", () => {
    expect(Fraction(7, 8).div(Fraction(5, 6))).toSatisfy(fractionEquals.bind(Fraction(21, 20)));
    expect(Fraction(7, 8).div(Fraction(-5, 6))).toSatisfy(fractionEquals.bind(Fraction(-21, 20)));
    expect(Fraction(-7, 8).div(Fraction(5, 6))).toSatisfy(fractionEquals.bind(Fraction(-21, 20)));
    expect(Fraction(-7, 8).div(Fraction(-5, 6))).toSatisfy(fractionEquals.bind(Fraction(21, 20)));
});

it("makes a modulo of the two operands", () => {
    expect(Fraction(7, 8).mod()).toSatisfy(fractionEquals.bind(Fraction(7, 1)));
    expect(Fraction(78, 8).mod()).toSatisfy(fractionEquals.bind(Fraction(6, 1)));
    expect(Fraction(-7, 8).mod()).toSatisfy(fractionEquals.bind(Fraction(-7, 1)));
    expect(Fraction(-78, 8).mod()).toSatisfy(fractionEquals.bind(Fraction(-6, 1)));
});

it("makes a modulo between two fractions", () => {
    expect(Fraction(7, 2).mod(2n)).toSatisfy(fractionEquals.bind(Fraction(3, 2)));
    expect(Fraction(7, 8).mod(1)).toSatisfy(fractionEquals.bind(Fraction(7, 8)));
    expect(Fraction(46815, 8534).mod(Fraction(1837, 5846843))).toSatisfy(fractionEquals.bind(Fraction(268365, 49896958162)));
});
