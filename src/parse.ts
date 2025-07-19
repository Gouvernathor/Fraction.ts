export function parse(str: string): [bigint, bigint] {
    let sign = 1n;
    let ndx = 0;

    let v = 0n, w = 0n, x = 0n, y = 1n, z = 1n;

    const match = str.replace(/_/g, "").match(/\d+|./g);

    if (!match) {
        throw new TypeError(`Cannot parse "${str}" as a fraction.`);
    }

    if (match[0] === "-") {
        sign = -1n;
        ndx++;
    } else if (match[0] === "+") {
        ndx++;
    }

    if (match.length === ndx + 1) {
        w = BigInt(match[ndx++]!) * sign;
    } else if (match[ndx + 1] === "." || match[ndx] === ".") {
        // if it's a decimal number

        if (match[ndx] !== ".") {
            v = BigInt(match[ndx++]!) * sign;
        }
        ndx++;

        if (ndx + 1 === match.length
            || match[ndx+1] === "(" && match[ndx+3] === ")"
            || match[ndx+1] === "'" && match[ndx+3] === "'") {
            w = BigInt(match[ndx]!) * sign;
            y = 10n ** BigInt(match[ndx]!.length);
            ndx++;
        }

        if (match[ndx] === "(" || match[ndx+2] === ")"
            || match[ndx] === "'" || match[ndx+2] === "'") {
            v = BigInt(match[ndx]!) * sign;
            w = BigInt(match[ndx+2]!) * sign;
            y = BigInt(match[ndx+4]!);
            ndx += 5;
        }
    } else if (match[ndx+1] === "/" || match[ndx+1] === ":") {
        w = BigInt(match[ndx]!) * sign;
        y = BigInt(match[ndx+2]!);
        ndx += 3;
    } else if (match[ndx+3] === "/" && match[ndx+1] === " ") {
        v = BigInt(match[ndx]!) * sign;
        w = BigInt(match[ndx+2]!) * sign;
        y = BigInt(match[ndx+4]!);
        ndx += 5;
    }

    if (match.length <= ndx) {
        const d = y * z;
        const n = x + d * v + z * w;
        return [n, d];
    } else {
        throw new TypeError(`Cannot parse "${str}" as a fraction.`);
    }
}

// decimal forms
const decimalInt = /^(\d+)\.?$/g; // 123. or 123

// decimal with repeating part
const decimalRepeatingFloat = /^(\d*)\.(\d*)(?:('|\()(\d+)('|\)))?$/g;

// fraction forms
/^\d+[/:]\d+$/g; // 123\456 or 123:456
// with a preceding whole number
const fractionWithWhole = /^(?:(\d+) )?(\d+)[/:](\d+)$/g; // 123 456/789 or 123 456:789

export function parse2(str: string): [bigint, bigint] {
    let r = decimalInt.exec(str);
    if (r) {
        return [BigInt(r[1]!), 1n];
    }

    r = decimalRepeatingFloat.exec(str);
    if (r) {
        const intPart = r[1] ? BigInt(r[1]) : 0n;
        if (r[3] === undefined) {
            // no repeating part
            if (!r[2] && !r[1]) {
                // just a dot, not valid
                throw new TypeError(`Cannot parse "${str}" as a fraction.`);
            }
            const fracPart = BigInt(r[2]!);
            const denominator = 10n ** BigInt(r[2]!.length);
            return [intPart * denominator + fracPart, denominator];
        } else if (r[3] === "'" && r[5] !== "'") {
            // mismatched repeating enclosing
            throw new TypeError(`Cannot parse "${str}" as a fraction.`);
        } else {
            const nonRepeatingPart = BigInt(r[2]!);
            const nonRepeatingDenominator = 10n ** BigInt(r[2]!.length);
            const repeatingPart = BigInt(r[4]!);
            const repeatingDenominator = 10n ** BigInt(r[4]!.length) - 1n;
            const denominator = nonRepeatingDenominator * repeatingDenominator;
            const numerator = repeatingPart + denominator * intPart + repeatingDenominator * nonRepeatingPart;
            return [numerator, denominator];
        }
    }

    r = fractionWithWhole.exec(str);
    if (r) {
        const wholePart = r[1] ? BigInt(r[1]) : 0n;
        const numerator = BigInt(r[2]!);
        const denominator = BigInt(r[3]!);
        if (denominator === 0n) {
            throw new TypeError(`Cannot parse "${str}" as a fraction: denominator cannot be zero.`);
        }
        return [wholePart * denominator + numerator, denominator];
    }

    throw new TypeError(`Cannot parse "${str}" as a fraction.`);
}
