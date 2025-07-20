import { fromAny } from "./constructors";
import { Fraction, FractionAble, IrreducibleFraction } from "./interface";
import { gcd } from "./mathUtils";
import { stringize } from "./stringize";

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
            this.denominator
        );
    }
    neg(): FractionImpl {
        return new FractionImpl(-this.numerator, this.denominator);
    }
    invert(): FractionImpl {
        if (this.numerator > 0n) {
            return new FractionImpl(this.denominator, this.numerator);
        } else {
            return new FractionImpl(-this.denominator, -this.numerator);
        }
    }

    add(other: FractionAble): FractionImpl {
        if (typeof other === "bigint") {
            return new FractionImpl(
                this.numerator + other * this.denominator,
                this.denominator
            );
        }

        other = fromAny(other);
        return new FractionImpl(
            this.numerator * other.denominator + other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }
    sub(other: FractionAble): FractionImpl {
        if (typeof other === "bigint") {
            return this.add(-other);
        }

        // not a call to add because inverting the other requires a call to fromAny
        other = fromAny(other);
        return new FractionImpl(
            this.numerator * other.denominator - other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }
    mul(other: FractionAble): FractionImpl {
        if (typeof other === "bigint") {
            return new FractionImpl(
                this.numerator * other,
                this.denominator
            );
        }

        other = fromAny(other);
        return new FractionImpl(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );
    }
    div(other: FractionAble): FractionImpl {
        if (typeof other === "bigint") {
            if (other === 0n) {
                throw new Error("Division by zero.");
            }
            if (other > 0n) {
                return new FractionImpl(
                    this.numerator,
                    this.denominator * other
                );
            } else {
                return new FractionImpl(
                    -this.numerator,
                    -this.denominator * other
                );
            }
        }

        other = fromAny(other);
        if (other.numerator === 0n) {
            throw new Error("Division by zero.");
        }
        let [otherN, otherD] = [other.numerator, other.denominator];
        if (otherN < 0n) {
            otherN = -otherN;
            otherD = -otherD;
        }
        return new FractionImpl(
            this.numerator * otherD,
            this.denominator * otherN
        );
    }

    private compare(other: Fraction): bigint {
        return this.numerator * other.denominator - other.numerator * this.denominator;
    }
    compareTo(other: FractionAble): 1|0|-1 {
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

    mod(n?: FractionAble): FractionImpl {
        if (n === undefined) {
            return new FractionImpl(this.numerator % this.denominator, 1n);
        }

        if (this.numerator < 0n) {
            return this.neg().mod(n).neg();
        }
        const nf = fromAny(n);
        if (nf.numerator === 0n) {
            throw new Error("Modulo by zero.");
        }
        if (nf.numerator < 0n) {
            return this.mod(nf.neg()).neg();
        }

        return new FractionImpl(
            (nf.denominator * this.numerator) % (nf.numerator * this.denominator),
            nf.denominator * this.denominator
        );
    }

    ceil(): bigint {
        return this.numerator / this.denominator +
            BigInt(this.numerator % this.denominator !== 0n && this.numerator >= 0n);
    }
    floor(): bigint {
        return this.numerator / this.denominator -
            BigInt(this.numerator % this.denominator !== 0n && this.numerator < 0n);
    }
    round(): bigint {
        const sign = this.numerator < 0n ? -1n : 1n;
        return this.numerator / this.denominator +
            sign * (BigInt(this.numerator !== 0n) + 2n * BigInt(((this.numerator*sign) % this.denominator) > this.denominator));
    }
    roundTo(multiple: Fraction): FractionImpl {
        const n = this.numerator * multiple.denominator;
        const d = this.denominator * multiple.numerator;
        const r = n % d;

        let k = n / d;
        if (2n*r >= d) {
            k++;
        }
        return new FractionImpl(k * multiple.numerator, multiple.denominator);
    }

    asIrreducible(): IrreducibleFractionImpl {
        // TODO test if this works for a negative fraction
        const g = gcd(this.numerator, this.denominator);
        return new IrreducibleFractionImpl(
            this.numerator / g,
            this.denominator / g
        );
    }
    limitDenominator(maxDenominator: bigint): IrreducibleFractionImpl {
        if (maxDenominator < 1) {
            throw new Error("Maximum denominator must be at least 1.");
        }

        if (this.denominator <= maxDenominator) {
            return this;
        }

        let [p0, q0, p1, q1] = [0n, 1n, 1n, 0n];
        let [n, d] = [this.numerator, this.denominator];
        while (true) {
            const a = n / d;
            const q2 = q0 + a * q1;
            if (q2 > maxDenominator) {
                break;
            }
            [p0, q0, p1, q1] = [p1, q1, p0 + a * p1, q2];
            [n, d] = [d, n - a * d];
        }
        const k = (maxDenominator - q0) / q1;

        if (2n*d*(q0 + k*q1) <= this.denominator) {
            return new IrreducibleFractionImpl(p1, q1);
        } else {
            return new IrreducibleFractionImpl(
                p0 + k * p1,
                q0 + k * q1
            );
        }
    }
    /**
     * Must only be called on a positive fraction.
     */
    private *absToContinued(): Generator<bigint> {
        let a = this.numerator;
        let b = this.denominator;

        do {
            yield a / b;
            [a, b] = [b, a % b];
        } while (a !== 0n);
    }
    private *generateSimplifiedAbs(): Generator<FractionImpl> {
        const cont = Array.from(this.abs().absToContinued());

        for (let i = 1; i < cont.length; i++) {
            let s = new FractionImpl(cont[i - 1]!, 1n);
            for (let j = i - 2; j >= 0; j--) {
                s = s.invert().add(cont[j]!);
            }
            yield s;
        }
    }
    simplify(error: number | bigint | Fraction): Fraction {
        // takes the simplest functions from the continued,
        // until it is within the required error gap

        const eps = fromAny(error).abs();

        for (const s of this.generateSimplifiedAbs()) {
            const diff = s.sub(this).abs();
            if (diff.lt(eps)) {
                if (this.numerator < 0n) {
                    return s.neg();
                }
                return s;
            }
        }

        return this; // if nothing found, return the absolute value
    }

    protected numValue(): number|bigint {
        if (this.denominator === 1n) {
            return this.numerator;
        }
        return Number(this.numerator) / Number(this.denominator);
    }
    valueOf(): number | bigint {
        const nv = this.numValue();
        if (!Number.isFinite(nv)) {
            return nv;
        }
        // if one of the values is out of f64 bounds, as a number it will be infinity,
        // and the result will be infinity.
        // if both are, the result will be NaN.
        // reducing both values can help bring them into bounds.
        // if that's still NaN, give up
        return this.asIrreducible().numValue();
    }
    toString = stringize;
    [Symbol.toPrimitive](hint: string): string | number | bigint {
        if (hint === "string") {
            return this.toString();
        }
        return this.valueOf();
    }
}

class IrreducibleFractionImpl extends FractionImpl implements IrreducibleFraction {
    constructor(numerator: bigint, denominator: bigint) {
        super(numerator, denominator);
    }

    override asIrreducible(): IrreducibleFractionImpl {
        return this; // already irreducible
    }

    override valueOf(): number | bigint {
        return this.numValue();
    }
}

const ONE_FRAC = new IrreducibleFractionImpl(1n, 1n);
