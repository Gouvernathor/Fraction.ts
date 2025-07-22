export type FractionAble = Fraction
    | bigint | number | string
    | [bigint|number, bigint|number]
    | { numerator: bigint; denominator: bigint };

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

    /**
     * Returns the modulo of the numerator with respect to the denominator.
     */
    mod(): Fraction;
    /**
     * Returns the modulo of the fraction with respect to another fraction or number.
     */
    mod(n: FractionAble): Fraction;

    // gcd(): Fraction;
    // lcm(): Fraction;

    ceil(): bigint;
    floor(): bigint;
    round(): bigint;
    roundTo(multiple: Fraction): Fraction;

    /**
     * Converts the fraction to an irreducible form.
     */
    asIrreducible(): IrreducibleFraction;
    /**
     * Limits the denominator of the fraction to a maximum value.
     * @param maxDenominator The maximum allowed denominator.
     */
    limitDenominator(maxDenominator: bigint): Fraction;
    /**
     * Simplifies the fraction to lower terms.
     * @param precision The maximum allowed error for the simplification.
     */
    simplify(precision: FractionAble): Fraction;

    valueOf(): number|bigint;
    toString(): string;
    [Symbol.toPrimitive](hint: "string"): string;
    [Symbol.toPrimitive](hint: "number"): number;
    [Symbol.toPrimitive](hint: "default"): number|bigint;
}

export interface IrreducibleFraction extends Fraction {}
