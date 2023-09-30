# Typescript-sort/enum

This rule enforces the sorting of property names alphabetically when declaring multiple properties on an enum. It helps developers maintain a consistent coding style and improves code readability.

## Rule Details

This rule checks all property definitions of an enum declaration and verifies that all keys are sorted alphabetically.

❌ Example of **incorrect** code for this rule:

```ts
/* eslint typescript-sort/enum: "error" */

enum MyEnum {
  a = string;
  c = string;
  b = string;
}
```

✅ Examples of **correct** code for this rule:

```ts
/* eslint typescript-sort/enum: "error" */

enum MyEnum {
  a = string;
  b = string;
  c = string;
}
```

## Options

```json
{
  "typescript-sort/enum": [
    "error",
    "asc",
    { "caseSensitive": true, "natural": true }
  ]
}
```

The 1st option is `"asc"` or `"desc"`.

- `"asc"` (default) - enforce enum members to be in ascending order.
- `"desc"` - enforce enum members to be in descending order.

The 2nd option is an object which has 2 properties.

- `caseSensitive` - if `true`, enforce enum members to be in case-sensitive order. Default is `true`.
- `natural` - if `true`, enforce enum members to be in natural order. Default is `false`. Natural Order compares strings containing combination of letters and numbers in the way a human being would sort. It basically sorts numerically, instead of sorting alphabetically. So the number 10 comes after the number 3 in Natural Sorting.

### desc

❌ Examples of **incorrect** code for the `"desc"` option:

```ts
/* eslint typescript-sort/enum: ["error", "desc"] */

enum MyEnum {
  b = string;
  c = string;
  a = string;
}
enum MyEnum {
  b = string;
  c = string;
  a = string;
}

// Case-sensitive by default.
enum MyEnum {
  C = string;
  b = string;
  a = string;
}

// Non-required first order by default.
enum MyEnum {
  a = string;
  b? = string;
  c = string;
}

// Non-natural order by default.
enum MyEnum {
  10 = number;
  2 = number;
  1 = number;
}
```

✅ Examples of **correct** code for the `"desc"` option:

```ts
/* eslint typescript-sort/enum: ["error", "desc"] */

enum MyEnum {
  c = string;
  b = string;
  a = string;
}
enum MyEnum {
  c = string;
  b = string;
  a = string;
}

// Case-sensitive by default.
enum MyEnum {
  b = string;
  a = string;
  C = string;
}

// Non-required first order by default.
enum MyEnum {
  c = string;
  b? = string;
  a = string;
}

// Non-natural order by default.
enum MyEnum {
  2 = number;
  10 = number;
  1 = number;
}
```

### insensitive

❌ Examples of **incorrect** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort/enum: ["error", "asc", { caseSensitive: false }] */

enum MyEnum {
  a = string;
  c = string;
  C = string;
  b = string;
}

enum MyEnum {
  a = string;
  C = string;
  c = string;
  b = string;
}
```

✅ Examples of **correct** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort/enum: ["error", "asc", { caseSensitive: false }] */

enum MyEnum {
  a = string;
  b = string;
  c = string;
  C = string;
}
enum MyEnum {
  a = string;
  b = string;
  C = string;
  c = string;
}
```

### natural

❌ Examples of **incorrect** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort/enum: ["error", "asc", { natural: true }] */

enum MyEnum {
  1 = number;
  10 = number;
  2 = number;
}
```

✅ Examples of **correct** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort/enum: ["error", "asc", { natural: true }] */

enum MyEnum {
  1 = number;
  2 = number;
  10 = number;
}
```

### required

❌ Examples of **incorrect** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort/enum: ["error", "asc", { requiredFirst: true }] */

enum MyEnum {
  d = string;
  c? = string;
  b? = string;
  a = string;
}
```

✅ Examples of **correct** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort/enum: ["error", "asc", { requiredFirst: true }] */

enum MyEnum {
  a = string;
  d = string;
  b? = string;
  c? = string;
}
```
