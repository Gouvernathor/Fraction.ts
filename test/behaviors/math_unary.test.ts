import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// abs, neg, invert

const fractionEquals = Fraction(1, 1).equals;

it("makes an absolute fraction", () => {
    const pos = Fraction(3, 4);
    const neg = Fraction(-3, 4);

    expect(pos.abs()).toSatisfy(fractionEquals.bind(pos));
    expect(neg.abs()).toSatisfy(fractionEquals.bind(pos));
});

it("negates a fraction", () => {
    const pos = Fraction(3, 4);
    const neg = Fraction(-3, 4);

    expect(pos.neg()).toSatisfy(fractionEquals.bind(neg));
    expect(neg.neg()).toSatisfy(fractionEquals.bind(pos));
});

it("inverts a fraction", () => {
    const pos = Fraction(3, 4);
    const neg = Fraction(-3, 4);
    const posInv = Fraction(4, 3);
    const negInv = Fraction(-4, 3);

    expect(pos.invert()).toSatisfy(fractionEquals.bind(posInv));
    expect(neg.invert()).toSatisfy(fractionEquals.bind(negInv));
});
