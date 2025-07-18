export type FractionAble = Fraction
    | bigint | number | string
    | [bigint|number, bigint|number]
    | { numerator: bigint; denominator: bigint };
type Numeric = Fraction | bigint | number;

export interface Fraction {
    readonly numerator: bigint;
    readonly denominator: bigint;

    abs(): Fraction;
    neg(): Fraction;
    invert(): Fraction;

    add(other: FractionAble): Fraction;
    sub(other: FractionAble): Fraction;
    mul(other: FractionAble): Fraction;
    div(other: FractionAble): Fraction;

    compareTo(other: FractionAble): number;
    equals(other: FractionAble): boolean;
    lt(other: FractionAble): boolean;
    lte(other: FractionAble): boolean;
    gt(other: FractionAble): boolean;
    gte(other: FractionAble): boolean;

    // pow(exponent: bigint|Fraction): Fraction;
    // log(base?: unknown): Fraction;

    mod(): Fraction;
    mod(n: bigint|number): Fraction;

    // gcd(): Fraction;
    // lcm(): Fraction;

    ceil(): bigint;
    floor(): bigint;
    round(): bigint;
    roundTo(multiple: Fraction): Fraction;

    simplify(precision?: Numeric): IrreducibleFraction;
    valueOf(): number|bigint; // returns a number
    toString(): string;
    [Symbol.toPrimitive](hint: "number"|"string"|"default"): string|number|bigint;
}

export interface IrreducibleFraction extends Fraction {}
