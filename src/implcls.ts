import { fromAny } from "./constructors";
import { Fraction, FractionAble, IrreducibleFraction } from "./interface";

export class FractionImpl implements Fraction {
    constructor(
        public readonly numerator: bigint,
        public readonly denominator: bigint
    ) {
        if (denominator === 0n) {
            throw new Error("Denominator cannot be zero.");
        }
    }

    abs(): Fraction {
        return new FractionImpl(
            this.numerator < 0n ? -this.numerator : this.numerator,
            this.denominator < 0n ? -this.denominator : this.denominator
        );
    }
    neg(): Fraction {
        return new FractionImpl(-this.numerator, this.denominator);
    }
    invert(): Fraction {
        return new FractionImpl(this.denominator, this.numerator);
    }

    add(other: FractionAble): Fraction {
        throw new Error("Method not implemented.");
    }
    sub(other: FractionAble): Fraction {
        throw new Error("Method not implemented.");
    }
    mul(other: FractionAble): Fraction {
        other = fromAny(other);
        return new FractionImpl(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );
    }
    div(other: FractionAble): Fraction {
        other = fromAny(other);
        if (other.numerator === 0n) {
            throw new Error("Division by zero.");
        }
        return new FractionImpl(
            this.numerator * other.denominator,
            this.denominator * other.numerator
        );
    }

    compare(other: FractionAble): number | bigint {
        throw new Error("Method not implemented.");
    }
    equals(other: FractionAble): boolean {
        return Number(this.compare(other)) === 0;
    }
    lt(other: FractionAble): boolean {
        return this.compare(other) < 0;
    }
    lte(other: FractionAble): boolean {
        return this.compare(other) <= 0;
    }
    gt(other: FractionAble): boolean {
        return this.compare(other) > 0;
    }
    gte(other: FractionAble): boolean {
        return this.compare(other) >= 0;
    }

    mod(): Fraction;
    mod(n: bigint | number): Fraction;
    mod(n?: bigint | number): Fraction {
        throw new Error("Method not implemented.");
    }

    ceil(): bigint {
        throw new Error("Method not implemented.");
    }
    floor(): bigint {
        throw new Error("Method not implemented.");
    }
    round(): bigint {
        throw new Error("Method not implemented.");
    }
    roundTo(multiple: Fraction): Fraction {
        throw new Error("Method not implemented.");
    }

    simplify(precision?: number | bigint | Fraction): IrreducibleFraction {
        throw new Error("Method not implemented.");
    }
    valueOf(): number | bigint {
        if (this.denominator === 1n) {
            return this.numerator;
        }
        return Number(this.numerator) / Number(this.denominator);
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    [Symbol.toPrimitive](hint: string): string | number | bigint {
        if (hint === "string") {
            return this.toString();
        }
        return this.valueOf();
    }
}
