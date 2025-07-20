/**
 * FIXME This function doesn't seem to return the most exact fraction for a float (64).
 */
export function tupleFromNumber(num: number): [bigint, bigint] {
    let s = 1;
    if (num < 0) {
        s = -1;
        num = -num;
    }

    let z = 1;

    if (num >= 1) {
        z = 10 ** Math.floor(1 + Math.log10(num));
        num /= z;
    }

    let A = 0, B = 1, C = 1, D = 0;
    let n = 0;
    let d = 1;
    const N = 10_000_000;

    while (B <= N && D <= N) {
        const M = (A + C) / (B + D);

        if (num === M) {
            if (B + D <= N) {
                n = A + C;
                d = B + D;
            } else if (D > B) {
                n = C;
                d = D;
            } else {
                n = A;
                d = B;
            }
            break;
        } else {
            if (num > M) {
                A += C;
                B += D;
            } else {
                C += A;
                D += B;
            }

            if (B > N) {
                n = C;
                d = D;
            } else {
                n = A;
                d = B;
            }
        }
    }
    return [BigInt(n * z * s), BigInt(d)];
}
