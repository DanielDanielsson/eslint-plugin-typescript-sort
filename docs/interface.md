# Typescript-sort/interface

This rule enforces the sorting of property names alphabetically when declaring multiple properties on an interface. It helps developers maintain a consistent coding style and improves code readability.

## Rule Details

This rule checks all property definitions of an interface declaration and verifies that all keys are sorted alphabetically.

❌ Example of **incorrect** code for this rule:

```ts
/* eslint typescript-sort/interface: "error" */

interface MyInterface {
  a: string;
  c: string;
  b: string;
}
```

✅ Examples of **correct** code for this rule:

```ts
/* eslint typescript-sort/interface: "error" */

interface MyInterface {
  a: string;
  b: string;
  c: string;
}
```

## 🔧 Options

```json
{
  "typescript-sort/interface": [
    "error",
    "asc",
    { "caseSensitive": true, "natural": false, "requiredFirst": false }
  ]
}
```

**Options for this rule:**

- **Ordering**:

  - `"asc"` (default): Enforces properties to be in ascending order.
  - `"desc"`: Enforces properties to be in descending order.

- **Additional Configuration**:
  - An object with 3 properties:
    - `caseSensitive` (default: `true`): If `true`, enforces case-sensitive property order.
    - `natural` (default: `false`): If `true`, enforces natural order, sorting strings containing a combination of letters and numbers as a human would, i.e., numerically.
      - E.g. 1 2 10 3
      - With `natural` set to `true`, the ordering would be: 1 2 3 10
      - With `natural` set to `false`, the ordering would be: 1 2 10 3
    - `requiredFirst` (default: `false`): If `true`, enforces optional properties to come after required ones.

### Desc

❌ Examples of **incorrect** code for the `"desc"` option:

```ts
/* eslint typescript-sort/interface: ["error", "desc"] */

interface MyInterface {
  b: string;
  c: string;
  a: string;
}
interface MyInterface {
  b: string;
  c: string;
  a: string;
}

// Case-sensitive by default.
interface MyInterface {
  C: string;
  b: string;
  a: string;
}

// Non-required first order by default.
interface MyInterface {
  a: string;
  b?: string;
  c: string;
}

// Non-natural order by default.
interface MyInterface {
  10: number;
  2: number;
  1: number;
}
```

✅ Examples of **correct** code for the `"desc"` option:

```ts
/* eslint typescript-sort/interface: ["error", "desc"] */

interface MyInterface {
  c: string;
  b: string;
  a: string;
}
interface MyInterface {
  c: string;
  b: string;
  a: string;
}

// Case-sensitive by default.
interface MyInterface {
  b: string;
  a: string;
  C: string;
}

// Non-required first order by default.
interface MyInterface {
  c: string;
  b?: string;
  a: string;
}

// Non-natural order by default.
interface MyInterface {
  2: number;
  10: number;
  1: number;
}
```

### Insensitive

❌ Examples of **incorrect** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort/interface: ["error", "asc", { caseSensitive: false }] */

interface MyInterface {
  a: string;
  c: string;
  C: string;
  b: string;
}

interface MyInterface {
  a: string;
  C: string;
  c: string;
  b: string;
}
```

✅ Examples of **correct** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort/interface: ["error", "asc", { caseSensitive: false }] */

interface MyInterface {
  a: string;
  b: string;
  c: string;
  C: string;
}
interface MyInterface {
  a: string;
  b: string;
  C: string;
  c: string;
}
```

### Natural

❌ Examples of **incorrect** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort/interface: ["error", "asc", { natural: true }] */

interface MyInterface {
  1: number;
  10: number;
  2: number;
}
```

✅ Examples of **correct** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort/interface: ["error", "asc", { natural: true }] */

interface MyInterface {
  1: number;
  2: number;
  10: number;
}
```

### Ratural

❌ Examples of **incorrect** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort/interface: ["error", "asc", { requiredFirst: true }] */

interface MyInterface {
  d: string;
  c?: string;
  b?: string;
  a: string;
}
```

✅ Examples of **correct** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort/interface: ["error", "asc", { requiredFirst: true }] */

interface MyInterface {
  a: string;
  d: string;
  b?: string;
  c?: string;
}
```
