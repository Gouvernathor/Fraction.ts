import { tupleFromNumber } from "./fromNumber";
import { FractionImpl } from "./implcls";
import { Fraction, FractionAble } from "./interface";
import { parse } from "./parse";

export function fromNumber(num: number): Fraction {
    if (isNaN(num)) {
        throw new TypeError("Cannot create Fraction from NaN.");
    }

    if (num % 1 == 0) { // double equals because if num is negative, num % 1 is -0
        return fromBigInt(BigInt(num));
    }

    return fromTuple(tupleFromNumber(num));
}

export function fromBigInt(num: bigint): Fraction {
    return new FractionImpl(num, 1n);
}

export function fromString(str: string): Fraction {
    return fromTuple(parse(str));
}

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
