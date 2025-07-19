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
