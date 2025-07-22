import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// [Symbol.toPrimitive]

it("defaults to number conversion", () => {
    const fraction = Fraction(1, 3);
    expect(typeof fraction[Symbol.toPrimitive]("default")).toBeOneOf(["number", "bigint"]);
});
it("converts to the requested type", () => {
    let fraction = Fraction(5, 1);
    expect(typeof fraction[Symbol.toPrimitive]("number")).toBe("number");
    expect(typeof fraction[Symbol.toPrimitive]("default")).toBeOneOf(["number", "bigint"]);
    expect(typeof fraction[Symbol.toPrimitive]("string")).toBe("string");

    fraction = Fraction(1, 3);
    expect(typeof fraction[Symbol.toPrimitive]("number")).toBe("number");
    expect(typeof fraction[Symbol.toPrimitive]("default")).toBeOneOf(["number", "bigint"]);
    expect(typeof fraction[Symbol.toPrimitive]("string")).toBe("string");
});

// valueOf

it("rounds a fraction correctly to a JS number", () => {
    let f = Fraction(1, 3);
    expect(f.valueOf()).toBeCloseTo(1 / 3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(1 / 3);
    expect(+f).toBeCloseTo(1 / 3);
    expect(Number(f)).toBeCloseTo(1 / 3);

    f = Fraction(1, 10);
    expect(f.valueOf()).toBeCloseTo(0.1);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(0.1);
    expect(+f).toBeCloseTo(0.1);
    expect(Number(f)).toBeCloseTo(0.1);

    // sanity check
    expect(Number("2".repeat(400)+"7")).toBe(Infinity);
    f = Fraction(BigInt("2".repeat(400)+"7"), BigInt("3".repeat(400)+"1"));
    expect(f.valueOf()).toBeCloseTo(2/3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(2/3);
    expect(+f).toBeCloseTo(2/3);
    expect(Number(f)).toBeCloseTo(2/3);
});
it("returns a bigint for integral values", () => {
    let f = Fraction(5, 1);
    expect(f.valueOf()).toBe(5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(5);
    expect(f[Symbol.toPrimitive]("default")).toBe(5n);
    expect(+f).toBe(5);
    expect(Number(f)).toBe(5);

    f = Fraction(-5, 1);
    expect(f.valueOf()).toBe(-5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(-5);
    expect(f[Symbol.toPrimitive]("default")).toBe(-5n);
    expect(+f).toBe(-5);
    expect(Number(f)).toBe(-5);
});
it("works just as well for irreducible fractions", () => {
    let f = Fraction(1, 3).asIrreducible();
    expect(f.valueOf()).toBeCloseTo(1 / 3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(1 / 3);
    expect(+f).toBeCloseTo(1 / 3);
    expect(Number(f)).toBeCloseTo(1 / 3);

    f = Fraction(1, 10).asIrreducible();
    expect(f.valueOf()).toBeCloseTo(0.1);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(0.1);
    expect(+f).toBeCloseTo(0.1);
    expect(Number(f)).toBeCloseTo(0.1);

    // sanity check
    expect(Number("2".repeat(400)+"7")).toBe(Infinity);
    f = Fraction(BigInt("2".repeat(400)+"7"), BigInt("3".repeat(400)+"1")).asIrreducible();
    expect(f.valueOf()).toBeCloseTo(2/3);
    expect(f[Symbol.toPrimitive]("number")).toBeCloseTo(2/3);
    expect(+f).toBeCloseTo(2/3);
    expect(Number(f)).toBeCloseTo(2/3);

    f = Fraction(5, 1).asIrreducible();
    expect(f.valueOf()).toBe(5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(5);
    expect(f[Symbol.toPrimitive]("default")).toBe(5n);
    expect(+f).toBe(5);
    expect(Number(f)).toBe(5);

    f = Fraction(-5, 1).asIrreducible();
    expect(f.valueOf()).toBe(-5n);
    expect(f[Symbol.toPrimitive]("number")).toBe(-5);
    expect(f[Symbol.toPrimitive]("default")).toBe(-5n);
    expect(+f).toBe(-5);
    expect(Number(f)).toBe(-5);
});

// toString

it("returns a string representation of the fraction", () => {
    let f = Fraction(1, 3);
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction(".5");
    expect(f.toString()).toBe("0.5");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.5");
    expect(`${f}`).toBe("0.5");

    // f = Fraction("2_000_000"); // TODO: support underscores in strings
    f = Fraction("2000000");
    expect(f.toString()).toBe("2000000");
    expect(f[Symbol.toPrimitive]("string")).toBe("2000000");
    expect(`${f}`).toBe("2000000");

    f = Fraction("-.5");
    expect(f.toString()).toBe("-0.5");
    expect(f[Symbol.toPrimitive]("string")).toBe("-0.5");
    expect(`${f}`).toBe("-0.5");

    f = Fraction("123");
    expect(f.toString()).toBe("123");
    expect(f[Symbol.toPrimitive]("string")).toBe("123");
    expect(`${f}`).toBe("123");

    f = Fraction("-123");
    expect(f.toString()).toBe("-123");
    expect(f[Symbol.toPrimitive]("string")).toBe("-123");
    expect(`${f}`).toBe("-123");

    f = Fraction("123.4");
    expect(f.toString()).toBe("123.4");
    expect(f[Symbol.toPrimitive]("string")).toBe("123.4");
    expect(`${f}`).toBe("123.4");

    f = Fraction("-123.4");
    expect(f.toString()).toBe("-123.4");
    expect(f[Symbol.toPrimitive]("string")).toBe("-123.4");
    expect(`${f}`).toBe("-123.4");

    f = Fraction("123.");
    expect(f.toString()).toBe("123");
    expect(f[Symbol.toPrimitive]("string")).toBe("123");
    expect(`${f}`).toBe("123");

    f = Fraction("-123.");
    expect(f.toString()).toBe("-123");
    expect(f[Symbol.toPrimitive]("string")).toBe("-123");
    expect(`${f}`).toBe("-123");

    f = Fraction("123.4(56)");
    expect(f.toString()).toBe("123.4(56)");
    expect(f[Symbol.toPrimitive]("string")).toBe("123.4(56)");
    expect(`${f}`).toBe("123.4(56)");

    f = Fraction("-123.4(56)");
    expect(f.toString()).toBe("-123.4(56)");
    expect(f[Symbol.toPrimitive]("string")).toBe("-123.4(56)");
    expect(`${f}`).toBe("-123.4(56)");

    f = Fraction("123.(4)");
    expect(f.toString()).toBe("123.(4)");
    expect(f[Symbol.toPrimitive]("string")).toBe("123.(4)");
    expect(`${f}`).toBe("123.(4)");

    f = Fraction("-123.(4)");
    expect(f.toString()).toBe("-123.(4)");
    expect(f[Symbol.toPrimitive]("string")).toBe("-123.(4)");
    expect(`${f}`).toBe("-123.(4)");

    f = Fraction("0/1");
    expect(f.toString()).toBe("0");
    expect(f[Symbol.toPrimitive]("string")).toBe("0");
    expect(`${f}`).toBe("0");

    f = Fraction("1/9");
    expect(f.toString()).toBe("0.(1)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(1)");
    expect(`${f}`).toBe("0.(1)");

    f = Fraction("123/456");
    expect(f.toString()).toBe("0.269(736842105263157894)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.269(736842105263157894)");
    expect(`${f}`).toBe("0.269(736842105263157894)");

    f = Fraction("-123/456");
    expect(f.toString()).toBe("-0.269(736842105263157894)");
    expect(f[Symbol.toPrimitive]("string")).toBe("-0.269(736842105263157894)");
    expect(`${f}`).toBe("-0.269(736842105263157894)");

    f = Fraction("19 123/456");
    expect(f.toString()).toBe("19.269(736842105263157894)");
    expect(f[Symbol.toPrimitive]("string")).toBe("19.269(736842105263157894)");
    expect(`${f}`).toBe("19.269(736842105263157894)");

    f = Fraction("-19 123/456");
    expect(f.toString()).toBe("-19.269(736842105263157894)");
    expect(f[Symbol.toPrimitive]("string")).toBe("-19.269(736842105263157894)");
    expect(`${f}`).toBe("-19.269(736842105263157894)");

    f = Fraction("+33.3(3)");
    expect(f.toString()).toBe("33.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("33.(3)");
    expect(`${f}`).toBe("33.(3)");

    f = Fraction("3.'09009'");
    expect(f.toString()).toBe("3.(09009)");
    expect(f[Symbol.toPrimitive]("string")).toBe("3.(09009)");
    expect(`${f}`).toBe("3.(09009)");

    f = Fraction(0);
    expect(f.toString()).toBe("0");
    expect(f[Symbol.toPrimitive]("string")).toBe("0");
    expect(`${f}`).toBe("0");

    // f = Fraction(.2); // expected difference from the Fraction.js standard : no "fix" on float values
    f = Fraction(1, 5);
    expect(f.toString()).toBe("0.2");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.2");
    expect(`${f}`).toBe("0.2");

    // f = Fraction(.333); // idem
    f = Fraction(333, 1000);
    expect(f.toString()).toBe("0.333");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.333");
    expect(`${f}`).toBe("0.333");

    // f = Fraction(1.1); // idem
    f = Fraction(11, 10);
    expect(f.toString()).toBe("1.1");
    expect(f[Symbol.toPrimitive]("string")).toBe("1.1");
    expect(`${f}`).toBe("1.1");

    // f = Fraction(1.2); // idem
    f = Fraction(12, 10);
    expect(f.toString()).toBe("1.2");
    expect(f[Symbol.toPrimitive]("string")).toBe("1.2");
    expect(`${f}`).toBe("1.2");

    // f = Fraction(1.3); // idem
    f = Fraction(13, 10);
    expect(f.toString()).toBe("1.3");
    expect(f[Symbol.toPrimitive]("string")).toBe("1.3");
    expect(`${f}`).toBe("1.3");

    // f = Fraction(1.4); // idem
    f = Fraction(14, 10);
    expect(f.toString()).toBe("1.4");
    expect(f[Symbol.toPrimitive]("string")).toBe("1.4");
    expect(`${f}`).toBe("1.4");

    f = Fraction(1.5);
    expect(f.toString()).toBe("1.5");
    expect(f[Symbol.toPrimitive]("string")).toBe("1.5");
    expect(`${f}`).toBe("1.5");

    // f = Fraction(2.555); // idem
    f = Fraction(2555, 1000);
    expect(f.toString()).toBe("2.555");
    expect(f[Symbol.toPrimitive]("string")).toBe("2.555");
    expect(`${f}`).toBe("2.555");

    f = Fraction(1e12);
    expect(f.toString()).toBe("1000000000000");
    expect(f[Symbol.toPrimitive]("string")).toBe("1000000000000");
    expect(`${f}`).toBe("1000000000000");

    f = Fraction([22, 7]);
    expect(f.toString()).toBe('3.(142857)');
    expect(f[Symbol.toPrimitive]("string")).toBe('3.(142857)');
    expect(`${f}`).toBe('3.(142857)');

    f = Fraction("355/113");
    expect(f.toString()).toBe("3.(1415929203539823008849557522123893805309734513274336283185840707964601769911504424778761061946902654867256637168)");
    expect(f[Symbol.toPrimitive]("string")).toBe("3.(1415929203539823008849557522123893805309734513274336283185840707964601769911504424778761061946902654867256637168)");
    expect(`${f}`).toBe("3.(1415929203539823008849557522123893805309734513274336283185840707964601769911504424778761061946902654867256637168)");

    f = Fraction("3 1/7");
    expect(f.toString()).toBe('3.(142857)');
    expect(f[Symbol.toPrimitive]("string")).toBe('3.(142857)');
    expect(`${f}`).toBe('3.(142857)');

    f = Fraction([36, -36]);
    expect(f.toString()).toBe("-1");
    expect(f[Symbol.toPrimitive]("string")).toBe("-1");
    expect(`${f}`).toBe("-1");

    f = Fraction([1n, 3n]);
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction(1n, 3n);
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction({ numerator: 1n, denominator: 3n });
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction({ numerator: 1n, denominator: 3n });
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction([1n, 3n]);
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction("9/12");
    expect(f.toString()).toBe("0.75");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.75");
    expect(`${f}`).toBe("0.75");

    f = Fraction("0.09(33)");
    expect(f.toString()).toBe("0.09(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.09(3)");
    expect(`${f}`).toBe("0.09(3)");

    f = Fraction(1 / 2);
    expect(f.toString()).toBe("0.5");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.5");
    expect(`${f}`).toBe("0.5");

    // f = Fraction(1 / 3); // still the same expected difference
    f = Fraction(1, 3);
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction("0.'3'");
    expect(f.toString()).toBe("0.(3)");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.(3)");
    expect(`${f}`).toBe("0.(3)");

    f = Fraction("0.00002");
    expect(f.toString()).toBe("0.00002");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.00002");
    expect(`${f}`).toBe("0.00002");

    f = Fraction(7 / 8);
    expect(f.toString()).toBe("0.875");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.875");
    expect(`${f}`).toBe("0.875");

    // f = Fraction(0.003); // idem
    f = Fraction(3, 1000);
    expect(f.toString()).toBe("0.003");
    expect(f[Symbol.toPrimitive]("string")).toBe("0.003");
    expect(`${f}`).toBe("0.003");

    f = Fraction(4);
    expect(f.toString()).toBe("4");
    expect(f[Symbol.toPrimitive]("string")).toBe("4");
    expect(`${f}`).toBe("4");

    f = Fraction(-99);
    expect(f.toString()).toBe("-99");
    expect(f[Symbol.toPrimitive]("string")).toBe("-99");
    expect(`${f}`).toBe("-99");

    f = Fraction("-92332.1192");
    expect(f.toString()).toBe("-92332.1192");
    expect(f[Symbol.toPrimitive]("string")).toBe("-92332.1192");
    expect(`${f}`).toBe("-92332.1192");

    f = Fraction('88.92933(12111)');
    expect(f.toString()).toBe("88.92933(12111)");
    expect(f[Symbol.toPrimitive]("string")).toBe("88.92933(12111)");
    expect(`${f}`).toBe("88.92933(12111)");

    f = Fraction('-192322.823(123)');
    expect(f.toString()).toBe("-192322.8(231)");
    expect(f[Symbol.toPrimitive]("string")).toBe("-192322.8(231)");
    expect(`${f}`).toBe("-192322.8(231)");
});
