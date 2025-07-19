import { FractionImpl } from "./implcls";
import { Fraction, FractionAble } from "./interface";
import { parse as fromString } from "./parse";

export declare function fromNumber(num: number): Fraction;
export function fromBigInt(num: bigint): Fraction {
    return new FractionImpl(num, 1n);
}
export { fromString };
export function fromPair(num: bigint|number, denom: bigint|number): Fraction {
    return new FractionImpl(
        BigInt(num),
        BigInt(denom)
    );
}
export function fromTuple([num, denom]: [bigint|number, bigint|number]): Fraction {
    return fromPair(num, denom);
}
export function fromObject({numerator, denominator }: { numerator: bigint; denominator: bigint }): Fraction {
    return new FractionImpl(numerator, denominator);
}

export function fromAny(obj: FractionAble): Fraction {
    if (obj instanceof FractionImpl) {
        return obj;
    } else if (typeof obj === "number") {
        return fromNumber(obj);
    } else if (typeof obj === "bigint") {
        return fromBigInt(obj);
    } else if (typeof obj === "string") {
        return fromString(obj);
    } else if (Array.isArray(obj) && obj.length === 2) {
        return fromTuple(obj as [bigint|number, bigint|number]);
    } else if (typeof obj === "object" && obj !== null) {
        return fromObject(obj as { numerator: bigint; denominator: bigint });
    }
    throw new TypeError(`Unsupported type for Fraction creation for ${obj}`);
}

// that will be exported as Function()
export function mainConstructor(obj: FractionAble): Fraction;
export function mainConstructor(a: bigint|number, b: bigint|number): Fraction;
export function mainConstructor(a: FractionAble, b?: bigint|number): Fraction {
    let rv = fromAny(a);
    if (b !== undefined) {
        rv = fromPair(rv.numerator, rv.denominator * BigInt(b));
    }
    return rv;
}
