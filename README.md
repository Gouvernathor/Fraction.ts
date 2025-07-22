# Fraction.ts

This is a library written in TypeScript for rational number manipulation.

The code is heavily inspired by [Fraction.js](https://github.com/rawify/Fraction.js), but the interface is not the same, focusing on type separation and not exposing more stuff than necessary. There are also a number of differences in number -> fraction conversion, and in string parsing (underscores are not supported).

## Fraction

`Fraction` in itself is an interface, a type exported as such. It is the return type of the constructor functions. Its methds and behaviors are defined further down. Access to the implementation class is not provided.

## Constructors

All constructors are exported through the single `Fraction` export, for instance `Fraction.fromNumeric`. Fraction is the only non-type export of the library. All constructors are functions : using `new` on them has undefined behavior.

### Fraction.fromNumeric

This constructor takes a single parameter, `n`, which can be a number or a bigint.

A bigint generates a fraction with a denominator of 1.

A number, however (since numbers in JavaScript are float64), generates a fraction whose value matches exactly the value of the number. This means that a value like `0.1` that cannot be represented exactly as a float64 will never be returned by this constructor when passed a number.

### Fraction.fromPair, Fraction.fromTuple and Fraction.fromObject

`Fraction.fromPair` takes two parameters, a numerator and a denominator, both of which can be either a number or a bigint.

`Fraction.fromTuple` takes a single parameter, which must be an array of two elements, both being a number or a bigint.

`Fraction.fromObject` takes a single object parameter, whose properties `numerator` and `denominator` must be bigints (they cannot be numbers in this case). The Fraction type matches this pattern.

### Fraction.fromString

This constructor takes a single string parameter that is parsed. There are several supported formats (each taking a prepending "+" or "-" sign):

- A decimal or integral number, such as "123", "123.", "123.456", "0.123" or ".123".
- A decimal number with a repetition sequences, such as "123.456(789)", ".123(456)", or ".(3)". The repeating part can be enclosed in parentheses or in simple quotes, such as "123.'456'". To be clear, that last example represents 123.456456456456...
- A fraction, in the form "123/456" or "123:456", with an optional preceding integer like "123 456/789".

This constructor allows you to create exact fractions from decimal numbers that cannot be represented exactly as a float64, such as `0.1` or `0.333...`.

### Fraction.fromAny

This *single-parameter* constructor is a combination of all the above single-parameter constructors (excluding `Fraction.fromPair`). The union of all the types accepted for that parameter is exported as the `FractionAble` type.

### Fraction

The `Fraction` object is actually itself a constructor function. You can see it as a wildcard : the union of all the above constructors, including `Fraction.fromPair`.

## Behavior

The `numerator` and `denominator` read-only properties of the `Fraction` object (returned by the constructors) are both bigints. The denominator is always strictly positive, but other than that, they can have any value : the fraction is not necessarily in its irreducible form. In fact, when this library generates an irreducible fraction, it marks it as such (in TypeScript) by returning the `IrreducibleFraction` type.

The `abs()`, `neg()` and `invert()` methods are expected simple unary math operations : taking the absolute value, the value of opposite sign, and the inverse of the fraction (switching the numerator and denominator), respectively.

The `add()`, `sub()`, `mul()` and `div()` methods take a single parameter which can be any `FractionAble` value (including, of course, other `Fraction` objects). They perform an addition, a subtraction, a multiplication or a division, respectively.

The `compareTo()` method takes a `FractionAble` parameter and returns a negative number if this fraction is less than the parameter, a positive number if it is greater, and 0 if they are equal. The `Fraction.compare()` function is a two-parameter version of this method, which can be passed to `Array.prototype.sort` or similar functions.

The `equals()`, `lt()`, `lte()`, `gt()` and `gte()` methods all take a `FractionAble` parameter and return a boolean indicating whether this fraction is equal to, less than, less than or equal to, greater than, or greater than or equal to the parameter, respectively.

The `mod()` parameter-less method returns the remainder of the numerator by the denominator, as a Fraction object (whose denominator is always 1).

The `mod()` single-parameter method takes a `FractionAble` parameter and returns the remainder of this fraction by the parameter, as a Fraction object. Note that it is not the same thing as calling the preceding method with a "1/1" fraction, for instance.

The `ceil()`, `floor()` and `round()` parameter-less methods return a bigint that is the closer integer to this fraction, respectively rounding up, down, or to the nearest integer (with ties rounded towards positive infinity, as Math.round() does). The `roundTo()` single-parameter method takes a Fraction, not a FractionAble, and returns a fraction that is a multiple of the parameter, and that is the closest to this fraction, rounding ties away from zero.

The `asIrreducible()` parameter-less method returns an `IrreducibleFraction` with the same exact value as this fraction. For instance, 2/4 will be returned as 1/2. To avoid that computation as much as possible, you can call this at the end of a series of calculations.

The `limitDenominator()` and `simplify()` methods serve a similar purpose of reducing the value of the operands of the fraction, at the cost of potentially losing some precision. The `limitDenominator()` method takes a single bigint parameter, which must be 1 or greater, and returns a fraction whose denominator is at most that value, and as close to the original fraction as possible. The `simplify()` method takes a `FractionAble` parameter which specifies the acceptable error margin.

The Fraction object can be converted or coerced to a string, a number or a bigint, either using the JavaScript coercion rules (`+f`, `${f}`, `f + ""`...) or by calling the `toString()` and `valueOf()` methods. The string representation is of the form "1.23(45)", and can always be passed back to the `Fraction.fromString()` constructor to get the same fraction back. The `valueOf()` method returns a bigint if the exact value of the fraction can be represented as such, or a number otherwise. If you want to be sure to get a number, you can either call `Number(f)` or do `+f`.
