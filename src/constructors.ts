import { tupleFromNumber } from "./fromNumber.js";
import { FractionImpl } from "./implcls.js";
import { Fraction, FractionAble } from "./interface.js";
import { parse } from "./parse.js";

function fromBigInt(num: bigint): Fraction {
    return new FractionImpl(num, 1n);
}

function fromNumber(num: number): Fraction {
    if (Number.isInteger(num)) {
        return fromBigInt(BigInt(num));
    }

    if (Number.isNaN(num)) {
        throw new TypeError("Cannot create Fraction from NaN.");
    }
    if (!Number.isFinite(num)) {
        throw new TypeError("Cannot create Fraction from non-finite number.");
    }

    return fromTuple(tupleFromNumber(num));
}

export function fromNumeric(num: bigint|number): Fraction {
    if (typeof num === "bigint") {
        return fromBigInt(num);
    } else if (typeof num === "number") {
        return fromNumber(num);
    }
    throw new TypeError(`Value of unsupported type for Fraction creation: ${num}`);
}

export function fromString(str: string): Fraction {
    return fromTuple(parse(str));
}

export function fromPair(num: bigint|number, denom: bigint|number): Fraction {
    return fromNumeric(num).div(fromNumeric(denom));
}

export function fromTuple([num, denom]: [bigint|number, bigint|number]): Fraction {
    return fromPair(num, denom);
}

export function fromObject({numerator, denominator }: { numerator: bigint; denominator: bigint }): Fraction {
    if (denominator < 0n) {
        numerator = -numerator;
        denominator = -denominator;
    }
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
