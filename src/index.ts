import type { FractionAble, Fraction as IFraction } from "./interface";
import * as constructors from "./constructors";

export type { IrreducibleFraction, FractionAble} from "./interface";

export type Fraction = IFraction;
// export type { IFraction as Fraction };
// export { IFraction as default };

type MainType = {
    (obj: FractionAble): IFraction;
    (a: bigint|number, b: bigint|number): IFraction;
    (a: FractionAble, b?: bigint|number): IFraction;

    fromNumeric(num: bigint|number): IFraction;
    fromString(str: string): IFraction;
    fromPair(num: bigint|number, denom: bigint|number): IFraction;
    fromTuple([num, denom]: [bigint|number, bigint|number]): IFraction;
    fromObject({numerator, denominator }: { numerator: bigint; denominator: bigint }): IFraction;

    fromAny(obj: FractionAble): IFraction;
}

const main = ((): MainType => {
    function mainConstructor(this: any, obj: FractionAble): IFraction;
    function mainConstructor(this: any, a: bigint|number, b: bigint|number): IFraction;
    function mainConstructor(this: any, a: FractionAble, b?: bigint|number): IFraction {
        if (b === undefined) {
            return constructors.fromAny(a);
        } else {
            return constructors.fromPair(a as bigint|number, b);
        }
    }
    mainConstructor.fromNumeric = constructors.fromNumeric;
    mainConstructor.fromString = constructors.fromString;
    mainConstructor.fromPair = constructors.fromPair;
    mainConstructor.fromTuple = constructors.fromTuple;
    mainConstructor.fromObject = constructors.fromObject;
    mainConstructor.fromAny = constructors.fromAny;
    return mainConstructor;
})();
// export const Fraction = main;
export { main as Fraction };
// export default main;
