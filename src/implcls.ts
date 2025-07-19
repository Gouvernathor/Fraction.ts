import { fromAny } from "./constructors";
import { Fraction, FractionAble, IrreducibleFraction } from "./interface";

export class FractionImpl implements Fraction {
    constructor(
        public readonly numerator: bigint,
        public readonly denominator: bigint
    ) {
        if (denominator <= 0n) {
            if (denominator === 0n) {
                throw new Error("Denominator cannot be zero.");
            }
            throw new Error("Denominator must be positive.");
        }
    }

    abs(): FractionImpl {
        return new FractionImpl(
            this.numerator < 0n ? -this.numerator : this.numerator,
            this.denominator < 0n ? -this.denominator : this.denominator
        );
    }
    neg(): FractionImpl {
        return new FractionImpl(-this.numerator, this.denominator);
    }
    invert(): FractionImpl {
        return new FractionImpl(this.denominator, this.numerator);
    }

    add(other: FractionAble): FractionImpl {
        other = fromAny(other);
        return new FractionImpl(
            this.numerator * other.denominator + other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }
    sub(other: FractionAble): FractionImpl {
        // not a call to add because inverting the other requires a call to fromAny
        other = fromAny(other);
        return new FractionImpl(
            this.numerator * other.denominator - other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }
    mul(other: FractionAble): FractionImpl {
        other = fromAny(other);
        return new FractionImpl(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );
    }
    div(other: FractionAble): FractionImpl {
        other = fromAny(other);
        if (other.numerator === 0n) {
            throw new Error("Division by zero.");
        }
        return new FractionImpl(
            this.numerator * other.denominator,
            this.denominator * other.numerator
        );
    }

    private compare(other: Fraction): bigint {
        return this.numerator * other.denominator - other.numerator * this.denominator;
    }
    compareTo(other: FractionAble): number {
        const c = this.compare(fromAny(other));
        return c === 0n ? 0 : c > 0n ? 1 : -1;
    }
    equals(other: FractionAble): boolean {
        return this.compare(fromAny(other)) === 0n;
    }
    lt(other: FractionAble): boolean {
        return this.compare(fromAny(other)) < 0n;
    }
    lte(other: FractionAble): boolean {
        return this.compare(fromAny(other)) <= 0n;
    }
    gt(other: FractionAble): boolean {
        return this.compare(fromAny(other)) > 0n;
    }
    gte(other: FractionAble): boolean {
        return this.compare(fromAny(other)) >= 0n;
    }

    mod(n?: bigint | number): FractionImpl {
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
    roundTo(multiple: Fraction): FractionImpl {
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
