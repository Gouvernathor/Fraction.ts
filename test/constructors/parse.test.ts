import { expect, it } from "vitest";
import { Fraction } from "../../src/index";

// fromString

const fractionEquals = Fraction(1, 1).equals;

// legacy patterns
// 123.45
// 123/45
// 123:45
// 4 123/45
// 123.'456'
// 123.(456)
// 123.45'6'
// 123.45(6)
it("parses the legacy patterns", () => {
    expect(Fraction.fromString("123.45")).toSatisfy(fractionEquals.bind(Fraction(2469, 20)));
    expect(Fraction.fromString("123/45")).toSatisfy(fractionEquals.bind(Fraction(41, 15)));
    expect(Fraction.fromString("123:45")).toSatisfy(fractionEquals.bind(Fraction(41, 15)));
    expect(Fraction.fromString("4 123/45")).toSatisfy(fractionEquals.bind(Fraction(101, 15)));
    expect(Fraction.fromString("123.'456'")).toSatisfy(fractionEquals.bind(Fraction(41111, 333)));
    expect(Fraction.fromString("123.(456)")).toSatisfy(fractionEquals.bind(Fraction(41111, 333)));
    expect(Fraction.fromString("123.45'6'")).toSatisfy(fractionEquals.bind(Fraction(37037, 300)));
    expect(Fraction.fromString("123.45(6)")).toSatisfy(fractionEquals.bind(Fraction(37037, 300)));
});

// broader patterns
// integer:
// 123
// 123.
// float, potentially repeating:
// 123.45
// .123
// 123.45'6'
// 123.45(6)
// .123'456'
// .123(456)
// 123.'456'
// 123.(456)
// .'123'
// .(123)
// fraction:
// 123/456
// 123:456
// 123 456/789
// 123 456:789
it("parses integer values", () => {
    expect(Fraction.fromString("123")).toSatisfy(fractionEquals.bind(Fraction(123, 1)));
    expect(Fraction.fromString("123.")).toSatisfy(fractionEquals.bind(Fraction(123, 1)));
});
it("parses float values", () => {
    expect(Fraction.fromString("123.45")).toSatisfy(fractionEquals.bind(Fraction(12345, 100)));
    expect(Fraction.fromString(".123")).toSatisfy(fractionEquals.bind(Fraction(123, 1000)));
});
it("parses repeating float values", () => {
    expect(Fraction.fromString("123.45'6'")).toSatisfy(fractionEquals.bind(Fraction(37037, 300)));
    expect(Fraction.fromString("123.45(6)")).toSatisfy(fractionEquals.bind(Fraction(37037, 300)));
    expect(Fraction.fromString(".123'456'")).toSatisfy(fractionEquals.bind(Fraction(41111, 333000)));
    expect(Fraction.fromString(".123(456)")).toSatisfy(fractionEquals.bind(Fraction(41111, 333000)));
    expect(Fraction.fromString("123.'456'")).toSatisfy(fractionEquals.bind(Fraction(41111, 333)));
    expect(Fraction.fromString("123.(456)")).toSatisfy(fractionEquals.bind(Fraction(41111, 333)));
    expect(Fraction.fromString(".'123'")).toSatisfy(fractionEquals.bind(Fraction(123, 999)));
    expect(Fraction.fromString(".(123)")).toSatisfy(fractionEquals.bind(Fraction(123, 999)));
});
it("parses fraction values", () => {
    expect(Fraction.fromString("123/456")).toSatisfy(fractionEquals.bind(Fraction(123, 456)));
    expect(Fraction.fromString("123:456")).toSatisfy(fractionEquals.bind(Fraction(123, 456)));
    expect(Fraction.fromString("123 456/789")).toSatisfy(fractionEquals.bind(Fraction(456, 789).add(123)));
    expect(Fraction.fromString("123 456:789")).toSatisfy(fractionEquals.bind(Fraction(456, 789).add(123)));
});

// rejects:
it("rejects invalid strings", () => {
    expect(() => Fraction.fromString("123.45.67")).toThrow(TypeError);
    expect(() => Fraction.fromString(".")).toThrow(TypeError);
    expect(() => Fraction.fromString("123/")).toThrow(TypeError);
    expect(() => Fraction.fromString("123:")).toThrow(TypeError);
    expect(() => Fraction.fromString("123/45/67")).toThrow(TypeError);
    expect(() => Fraction.fromString("123:45:67")).toThrow(TypeError);
    expect(() => Fraction.fromString("/456")).toThrow(TypeError);
    expect(() => Fraction.fromString(":456")).toThrow(TypeError);
    expect(() => Fraction.fromString("123'456'")).toThrow(TypeError);
    expect(() => Fraction.fromString("123(456)")).toThrow(TypeError);
    expect(() => Fraction.fromString("123'456'.789")).toThrow(TypeError);
    expect(() => Fraction.fromString("123(456).789")).toThrow(TypeError);
    expect(() => Fraction.fromString("123.45'6)")).toThrow(TypeError);
    expect(() => Fraction.fromString("123.45(6'")).toThrow(TypeError);
});
