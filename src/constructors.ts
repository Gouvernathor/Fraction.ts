import { Fraction, FractionAble } from "./interface";

export declare function fromNumber(num: number): Fraction;
export declare function fromBigInt(num: bigint): Fraction;
export declare function fromString(str: string): Fraction; // re-export a parse function
export declare function fromPair(num: bigint|number, denom: bigint|number): Fraction;
export function fromTuple([num, denom]: [bigint|number, bigint|number]): Fraction {
    return fromPair(num, denom);
}
export declare function fromObject(obj: { numerator: bigint; denominator: bigint }): Fraction;

export function fromAny(obj: FractionAble): Fraction {
    if (typeof obj === "number") {
        return fromNumber(obj);
    } else if (typeof obj === "bigint") {
        return fromBigInt(obj);
    } else if (typeof obj === "string") {
        return fromString(obj);
    } else if (Array.isArray(obj)) {
        return fromTuple(obj as [bigint|number, bigint|number]);
    } else if (typeof obj === "object" && obj !== null) {
        return fromObject(obj as { numerator: bigint; denominator: bigint });
    }
    throw new TypeError(`Unsupported type for Fraction creation for ${obj}`);
}

// TODO make a more-wildcard constructor with an optional second parameter
// that will be exported as Function()
