export function gcd(a: bigint, b: bigint): bigint {
    if (!a) return b;
    if (!b) return a;

    while (true) {
        a %= b;
        if (!a) return b;
        b %= a;
        if (!b) return a;
    }
}

/**
 * Supposes that `arg` is a finite number.
 */
export function frexp(arg: number): [number, bigint] {
    const absArg = Math.abs(arg);

    if (absArg === 0) {
        return [0, 0n];
    }

    let exponent = BigInt(Math.max(-1023, Math.floor(Math.log2(absArg))+1));
    let x = absArg / Number(2n ** exponent);

    while (x < 0.5) {
        x *= 2;
        exponent--;
    }
    while (x >= 1) {
        x /= 2;
        exponent++;
    }

    if (arg < 0) {
        x = -x;
    }
    return [x, exponent];
}
