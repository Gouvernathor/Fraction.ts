import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// fromPair, fromTuple, fromObject

const DIGITS = "0123456789";
function randDigit(): string {
    return DIGITS[Math.floor(Math.random() * DIGITS.length)];
}

it("builds a fraction from two random bigints", () => {
    const a = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    const b = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    let fpair = Fraction.fromPair(a, b);
    let ftuple = Fraction.fromTuple([a, b]);
    let fobj = Fraction.fromObject({ numerator: a, denominator: b });

    expect(fpair.numerator).toBe(a);
    expect(fpair.denominator).toBe(b);
    expect(ftuple.numerator).toBe(a);
    expect(ftuple.denominator).toBe(b);
    expect(fobj.numerator).toBe(a);
    expect(fobj.denominator).toBe(b);

    fpair = Fraction.fromPair(-a, b);
    ftuple = Fraction.fromTuple([-a, b]);
    fobj = Fraction.fromObject({ numerator: -a, denominator: b });

    expect(fpair.numerator).toBe(-a);
    expect(fpair.denominator).toBe(b);
    expect(ftuple.numerator).toBe(-a);
    expect(ftuple.denominator).toBe(b);
    expect(fobj.numerator).toBe(-a);
    expect(fobj.denominator).toBe(b);

    fpair = Fraction.fromPair(a, -b);
    ftuple = Fraction.fromTuple([a, -b]);
    fobj = Fraction.fromObject({ numerator: a, denominator: -b });

    expect(fpair.numerator).toBe(-a);
    expect(fpair.denominator).toBe(b);
    expect(ftuple.numerator).toBe(-a);
    expect(ftuple.denominator).toBe(b);
    expect(fobj.numerator).toBe(-a);
    expect(fobj.denominator).toBe(b);

    fpair = Fraction.fromPair(-a, -b);
    ftuple = Fraction.fromTuple([-a, -b]);
    fobj = Fraction.fromObject({ numerator: -a, denominator: -b });

    expect(fpair.numerator).toBe(a);
    expect(fpair.denominator).toBe(b);
    expect(ftuple.numerator).toBe(a);
    expect(ftuple.denominator).toBe(b);
    expect(fobj.numerator).toBe(a);
    expect(fobj.denominator).toBe(b);
});

it("builds the same fraction from fromPair, fromTuple and fromObject with the same bigint values", () => {
    const a = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    const b = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    const fpair = Fraction.fromPair(a, b);
    const ftuple = Fraction.fromTuple([a, b]);
    const fobj = Fraction.fromObject({ numerator: a, denominator: b });

    expect(fpair.equals(ftuple)).toBe(true);
    expect(ftuple.equals(fpair)).toBe(true);
    expect(fpair.equals(fobj)).toBe(true);
    expect(fobj.equals(fpair)).toBe(true);
    expect(ftuple.equals(fobj)).toBe(true);
    expect(fobj.equals(ftuple)).toBe(true);
});

it("supports any combination of bigint and number in fromPair and fromTuple", () => {
    const bigA = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    const bigB = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    const numA = Number(bigA);
    const numB = Number(bigB);

    let t = (f: Fraction) => {
        expect(f.numerator).toEqual(bigA);
        expect(f.denominator).toEqual(bigB);
    };
    t(Fraction.fromPair(bigA, bigB));
    t(Fraction.fromPair(numA, numB));
    t(Fraction.fromPair(bigA, numB));
    t(Fraction.fromPair(numA, bigB));
    t(Fraction.fromTuple([bigA, bigB]));
    t(Fraction.fromTuple([numA, numB]));
    t(Fraction.fromTuple([bigA, numB]));
    t(Fraction.fromTuple([numA, bigB]));
    t(Fraction.fromPair(-bigA, -bigB));
    t(Fraction.fromPair(-numA, -numB));
    t(Fraction.fromPair(-bigA, -numB));
    t(Fraction.fromPair(-numA, -bigB));
    t(Fraction.fromTuple([-bigA, -bigB]));
    t(Fraction.fromTuple([-numA, -numB]));
    t(Fraction.fromTuple([-bigA, -numB]));
    t(Fraction.fromTuple([-numA, -bigB]));

    t = (f: Fraction) => {
        expect(f.numerator).toEqual(-bigA);
        expect(f.denominator).toEqual(bigB);
    };
    t(Fraction.fromPair(-bigA, bigB));
    t(Fraction.fromPair(-numA, numB));
    t(Fraction.fromPair(-bigA, numB));
    t(Fraction.fromPair(-numA, bigB));
    t(Fraction.fromTuple([-bigA, bigB]));
    t(Fraction.fromTuple([-numA, numB]));
    t(Fraction.fromTuple([-bigA, numB]));
    t(Fraction.fromTuple([-numA, bigB]));
    t(Fraction.fromPair(bigA, -bigB));
    t(Fraction.fromPair(numA, -numB));
    t(Fraction.fromPair(bigA, -numB));
    t(Fraction.fromPair(numA, -bigB));
    t(Fraction.fromTuple([bigA, -bigB]));
    t(Fraction.fromTuple([numA, -numB]));
    t(Fraction.fromTuple([bigA, -numB]));
    t(Fraction.fromTuple([numA, -bigB]));
});

it("builds the same fraction from fromPair and fromTuple with the same bigint or number values", () => {
    const bigA = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    const bigB = BigInt(Array.from({ length: Math.floor(Math.random() * 15) + 1 }, randDigit).join(""));
    const numA = Number(bigA);
    const numB = Number(bigB);

    let t = (f: Fraction, ...fs: Fraction[]) => {
        for (const f2 of fs) {
            expect(f.numerator).toEqual(f2.numerator);
            expect(f.denominator).toEqual(f2.denominator);
        }
        if (fs.length > 0) {
            t(fs[0], ...fs.slice(1));
        }
    };
    t(
        Fraction.fromPair(bigA, bigB),
        Fraction.fromPair(-bigA, -bigB),
        Fraction.fromPair(numA, numB),
        Fraction.fromPair(-numA, -numB),
        Fraction.fromPair(bigA, numB),
        Fraction.fromPair(-bigA, -numB),
        Fraction.fromPair(numA, bigB),
        Fraction.fromPair(-numA, -bigB),
        Fraction.fromTuple([bigA, bigB]),
        Fraction.fromTuple([-bigA, -bigB]),
        Fraction.fromTuple([numA, numB]),
        Fraction.fromTuple([-numA, -numB]),
        Fraction.fromTuple([bigA, numB]),
        Fraction.fromTuple([-bigA, -numB]),
        Fraction.fromTuple([numA, bigB]),
        Fraction.fromTuple([-numA, -bigB])
    );
    t(
        Fraction.fromPair(-bigA, bigB),
        Fraction.fromPair(bigA, -bigB),
        Fraction.fromPair(-numA, numB),
        Fraction.fromPair(numA, -numB),
        Fraction.fromPair(-bigA, numB),
        Fraction.fromPair(bigA, -numB),
        Fraction.fromPair(-numA, bigB),
        Fraction.fromPair(numA, -bigB),
        Fraction.fromTuple([-bigA, bigB]),
        Fraction.fromTuple([bigA, -bigB]),
        Fraction.fromTuple([-numA, numB]),
        Fraction.fromTuple([numA, -numB]),
        Fraction.fromTuple([-bigA, numB]),
        Fraction.fromTuple([bigA, -numB]),
        Fraction.fromTuple([-numA, bigB]),
        Fraction.fromTuple([numA, -bigB])
    );
});
