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
