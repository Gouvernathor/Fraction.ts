// @ts-expect-error
function parseLegacy(str: string): [bigint, bigint] {
    let sign = 1n;
    let ndx = 0;

    let intPart = 0n,
        nonRepeatingPart = 0n,
        repeatingPart = 0n,
        nonRepeatingDenominator = 1n,
        repeatingDenominator = 1n;

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
        nonRepeatingPart = BigInt(match[ndx++]!) * sign;
    } else if (match[ndx + 1] === "." || match[ndx] === ".") {
        // if it's a decimal number

        if (match[ndx] !== ".") {
            intPart = BigInt(match[ndx++]!) * sign;
        }
        ndx++;

        if (ndx + 1 === match.length
            || match[ndx+1] === "(" && match[ndx+3] === ")"
            || match[ndx+1] === "'" && match[ndx+3] === "'") {
            nonRepeatingPart = BigInt(match[ndx]!) * sign;
            nonRepeatingDenominator = 10n ** BigInt(match[ndx]!.length);
            ndx++;
        }

        if (match[ndx] === "(" || match[ndx+2] === ")"
            || match[ndx] === "'" || match[ndx+2] === "'") {
            intPart = BigInt(match[ndx]!) * sign;
            nonRepeatingPart = BigInt(match[ndx+2]!) * sign;
            nonRepeatingDenominator = BigInt(match[ndx+4]!);
            ndx += 5;
        }
    } else if (match[ndx+1] === "/" || match[ndx+1] === ":") {
        nonRepeatingPart = BigInt(match[ndx]!) * sign;
        nonRepeatingDenominator = BigInt(match[ndx+2]!);
        ndx += 3;
    } else if (match[ndx+3] === "/" && match[ndx+1] === " ") {
        intPart = BigInt(match[ndx]!) * sign;
        nonRepeatingPart = BigInt(match[ndx+2]!) * sign;
        nonRepeatingDenominator = BigInt(match[ndx+4]!);
        ndx += 5;
    }

    if (match.length <= ndx) {
        const denominator = nonRepeatingDenominator * repeatingDenominator;
        const numerator = repeatingPart + denominator * intPart + repeatingDenominator * nonRepeatingPart;
        return [numerator, denominator];
    } else {
        throw new TypeError(`Cannot parse "${str}" as a fraction.`);
    }
}

// decimal forms
const decimalInt = /^(\d+)\.?$/; // 123. or 123

// decimal with repeating part
const decimalRepeatingFloat = /^(\d*)\.(\d*)(?:('|\()(\d+)('|\)))?$/;

// fraction forms
/^\d+[/:]\d+$/; // 123\456 or 123:456
// with a preceding whole number
const fractionWithWhole = /^(?:(\d+) )?(\d+)[/:](\d+)$/; // 123 456/789 or 123 456:789

/**
 * A less efficient version (using several regexes), but more readable and more permissive.
 */
function parseRevamp(str: string): [bigint, bigint] {
    let sign = 1n;
    if (str[0] === "-") {
        sign = -1n;
        str = str.slice(1);
    } else if (str[0] === "+") {
        str = str.slice(1);
    }

    let r: ReturnType<typeof RegExp.prototype.exec>;
    if (r = decimalInt.exec(str)) {
        return [sign* BigInt(r[1]!), 1n];
    }

    if (r = decimalRepeatingFloat.exec(str)) {
        const intPart = r[1] ? BigInt(r[1]) : 0n;
        if (r[3] === undefined) {
            // no repeating part
            if (!r[2] && !r[1]) {
                // just a dot, not valid
                throw new TypeError(`Cannot parse "${str}" as a fraction: no digits found.`);
            }
            const fracPart = BigInt(r[2]!);
            const denominator = 10n ** BigInt(r[2]!.length);
            return [sign* (intPart * denominator + fracPart), denominator];
        } else if ((r[3] === "'") !== (r[5] === "'")) {
            // mismatched repeating enclosing
            throw new TypeError(`Cannot parse "${str}" as a fraction: mismatched repeating enclosing.`);
        } else {
            const nonRepeatingPart = BigInt(r[2]!);
            const nonRepeatingDenominator = 10n ** BigInt(r[2]!.length);
            const repeatingPart = BigInt(r[4]!);
            const repeatingDenominator = 10n ** BigInt(r[4]!.length) - 1n;
            const denominator = nonRepeatingDenominator * repeatingDenominator;
            const numerator = repeatingPart + denominator * intPart + repeatingDenominator * nonRepeatingPart;
            return [sign* numerator, denominator];
        }
    }

    if (r = fractionWithWhole.exec(str)) {
        const wholePart = r[1] ? BigInt(r[1]) : 0n;
        const numerator = BigInt(r[2]!);
        const denominator = BigInt(r[3]!);
        if (denominator === 0n) {
            throw new TypeError(`Cannot parse "${str}" as a fraction: denominator cannot be zero.`);
        }
        return [sign* (wholePart * denominator + numerator), denominator];
    }

    throw new TypeError(`Cannot parse "${str}" as a fraction: no match.`);
}

export { parseRevamp as parse };
