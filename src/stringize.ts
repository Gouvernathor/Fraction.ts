import { Fraction } from "./interface";

declare function cycleLen(numerator: bigint, denominator: bigint): bigint;
declare function cycleStart(numerator: bigint, denominator: bigint, cycleLength: bigint): bigint;
// TODO make one function returning both values

export function stringize(this: Fraction, dec = 15n): string {
    let N = this.numerator < 0n ? -this.numerator : this.numerator;
    let D = this.denominator;

    const cyclen = cycleLen(N, D);
    const cycoff = cycleStart(N, D, cyclen);

    let str = (this.numerator < 0n ? "-" : "")
        + (N / D).toString();

    N %= D;
    N *= 10n;

    if (N) {
        str += ".";
    }

    if (cyclen) {
        for (let i = cycoff; i--;) {
            str += (N / D).toString();
            N %= D;
            N *= 10n;
        }
        str += "(";
        for (let i = cyclen; i--;) {
            str += (N / D).toString();
            N %= D;
            N *= 10n;
        }
        str += ")";
    } else {
        for (let i = dec; N && i--;) {
            str += (N / D).toString();
            N %= D;
            N *= 10n;
        }
    }
    return str;
}
