import { Fraction } from "./interface.js";

const MAX_CYCLE_LENGTH = 2000n;

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    while (exp > 0n) {
        if (exp & 1n) {
            result = (result * base) % mod;
        }

        base = (base * base) % mod;
        exp >>= 1n;
    }
    return result;
}
function cycleLen(denominator: bigint): bigint {
    while (denominator % 2n === 0n) denominator /= 2n;

    while (denominator % 5n === 0n) denominator /= 5n;

    if (denominator === 1n) return 0n;

    let rem = 10n % denominator;
    let t = 1n;

    while (rem !== 1n) {
        rem = (rem * 10n) % denominator;
        t++;
        if (t > MAX_CYCLE_LENGTH) {
            return 0n; // meaning that it's not printed as a cyclic number, the answer is likely denominator-1
        }
    }
    return t;
}
function cycleStart(denominator: bigint, cycleLength: bigint): bigint {
    let rem1 = 1n;
    let rem2 = modPow(10n, cycleLength, denominator);

    for (let t = 0n; t < 300n; t++) {
        if (rem1 === rem2) {
            return t;
        }

        rem1 = (rem1 * 10n) % denominator;
        rem2 = (rem2 * 10n) % denominator;
    }
    return 0n;
}

export function stringize(this: Fraction, dec = 15n): string {
    let N = this.numerator < 0n ? -this.numerator : this.numerator;
    let D = this.denominator;

    const cyclen = cycleLen(D);
    const cycoff = cycleStart(D, cyclen);

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
