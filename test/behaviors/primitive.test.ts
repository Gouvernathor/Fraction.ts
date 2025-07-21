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
    let f = Fraction(1, 3);
    expect(f.valueOf()).toBeCloseTo(1 / 3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(1 / 3);
    expect(+f).toBeCloseTo(1 / 3);

    f = Fraction(1, 10);
    expect(f.valueOf()).toBeCloseTo(0.1);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(0.1);
    expect(+f).toBeCloseTo(0.1);

    // sanity check
    expect(Number("2".repeat(400)+"7")).toBe(Infinity);
    f = Fraction(BigInt("2".repeat(400)+"7"), BigInt("3".repeat(400)+"1"));
    expect(f.valueOf()).toBeCloseTo(2/3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(2/3);
    expect(+f).toBeCloseTo(2/3);
});
it("returns a bigint for integral values", () => {
    let f = Fraction(5, 1);
    expect(f.valueOf()).toBe(5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(5n);
    expect(() => +f).toThrow();

    f = Fraction(-5, 1);
    expect(f.valueOf()).toBe(-5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(-5n);
    expect(() => +f).toThrow();
});
it("works just as well for irreducible fractions", () => {
    let f = Fraction(1, 3).asIrreducible();
    expect(f.valueOf()).toBeCloseTo(1 / 3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(1 / 3);
    expect(+f).toBeCloseTo(1 / 3);

    f = Fraction(1, 10).asIrreducible();
    expect(f.valueOf()).toBeCloseTo(0.1);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(0.1);
    expect(+f).toBeCloseTo(0.1);

    // sanity check
    expect(Number("2".repeat(400)+"7")).toBe(Infinity);
    f = Fraction(BigInt("2".repeat(400)+"7"), BigInt("3".repeat(400)+"1")).asIrreducible();
    expect(f.valueOf()).toBeCloseTo(2/3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(2/3);
    expect(+f).toBeCloseTo(2/3);

    f = Fraction(5, 1).asIrreducible();
    expect(f.valueOf()).toBe(5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(5n);
    expect(() => +f).toThrow();

    f = Fraction(-5, 1).asIrreducible();
    expect(f.valueOf()).toBe(-5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(-5n);
    expect(() => +f).toThrow();
});

// toString
