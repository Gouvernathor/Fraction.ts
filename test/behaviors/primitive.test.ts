import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// [Symbol.toPrimitive]

it("defaults to number conversion", () => {
    const fraction = Fraction(1, 3);
    expect(typeof fraction[Symbol.toPrimitive]("default")).toBeOneOf(["number", "bigint"]);
});
it("converts to the requested type", () => {
    const fraction = Fraction(1, 3);
    expect(typeof fraction[Symbol.toPrimitive]("number")).toBeOneOf(["number", "bigint"]);
    expect(typeof fraction[Symbol.toPrimitive]("string")).toBe("string");
});

// valueOf

it("rounds a fraction correctly to a JS number", () => {
    const f = Fraction(1, 3);
    expect(f.valueOf()).toBeCloseTo(1 / 3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(1 / 3);
    expect(+f).toBeCloseTo(1 / 3);

    expect(Fraction(1, 10).valueOf()).toBeCloseTo(0.1);

    expect(Number("2".repeat(400)+"7")).toBe(Infinity);
    expect(Number(Fraction(BigInt("2".repeat(400)+"7"), BigInt("3".repeat(400)+"1")).valueOf())).toBeCloseTo(2/3);
});

// toString
