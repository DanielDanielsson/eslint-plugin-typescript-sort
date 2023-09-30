# Sort Arrow function object parameters
# Typescript-sort/arrowfunc-object-params

This rule enforces the sorting of arrow function object parameters. It helps developers maintain a consistent coding style and improves code readability and makes a solid combo when combined with typescript-sort/type or typescript-sort/interface to sort component types/interfaces and props.  

## Rule Details

This rule checks all property definitions of an enum declaration and verifies that all keys are sorted alphabetically.

❌ Example of **incorrect** code for this rule:

```ts
/* eslint typescript-sort/arrowfunc-object-params: "error" */
export const MyComponent = ({
    b = 'default',
    a = 'default',
    c = 'default',
}) => null;
```

✅ Examples of **correct** code for this rule:

```ts
/* eslint typescript-sort/arrowfunc-object-params: "error" */

export const MyComponent = ({
    a = 'default',
    b = 'default',
    c = 'default',
}) => null;
```

## Options

```json
{
  "typescript-sort/arrowfunc-object-params": [
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
/* eslint typescript-sort/arrowfunc-object-params: ["error", "desc"] */

export const MyComponent = ({
    a = 'default',
    b = 'default',
    c = 'default',
}) => null;

// Case-sensitive by default.
export const MyComponent = ({
  C = string;
  b = string;
  a = string;
}

// Non-required first order by default.
export const MyComponent = ({
  a = string;
  b? = string;
  c = string;
}) => null;

// Non-natural order by default.
export const MyComponent = ({
  10 = number;
  2 = number;
  1 = number;
}) => null;
```

✅ Examples of **correct** code for the `"desc"` option:

```ts
/* eslint typescript-sort/arrowfunc-object-params: ["error", "desc"] */

export const MyComponent = ({
  c = string;
  b = string;
  a = string;
}) => null;
export const MyComponent = ({
  c = string;
  b = string;
  a = string;
}) => null;

// Case-sensitive by default.
export const MyComponent = ({
  b = string;
  a = string;
  C = string;
}) => null;

// Non-required first order by default.
export const MyComponent = ({
  c = string;
  b? = string;
  a = string;
}) => null;

// Non-natural order by default.
export const MyComponent = ({
  2 = number;
  10 = number;
  1 = number;
}) => null;
```

### insensitive

❌ Examples of **incorrect** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort/arrowfunc-object-params: ["error", "asc", { caseSensitive: false }] */

export const MyComponent = ({
  a = string;
  c = string;
  C = string;
  b = string;
}) => null;

export const MyComponent = ({
  a = string;
  C = string;
  c = string;
  b = string;
}) => null;
```

✅ Examples of **correct** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort/arrowfunc-object-params: ["error", "asc", { caseSensitive: false }] */

export const MyComponent = ({
  a = string;
  b = string;
  c = string;
  C = string;
}) => null;
export const MyComponent = ({
  a = string;
  b = string;
  C = string;
  c = string;
}) => null;
```

### natural

❌ Examples of **incorrect** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort/arrowfunc-object-params: ["error", "asc", { natural: true }] */

export const MyComponent = ({
  1 = number;
  10 = number;
  2 = number;
}) => null;
```

✅ Examples of **correct** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort/arrowfunc-object-params: ["error", "asc", { natural: true }] */

export const MyComponent = ({
  1 = number;
  2 = number;
  10 = number;
}) => null;
```

### required

❌ Examples of **incorrect** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort/arrowfunc-object-params: ["error", "asc", { requiredFirst: true }] */

export const MyComponent = ({
  d = string;
  c? = string;
  b? = string;
  a = string;
}) => null;
```

✅ Examples of **correct** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort/arrowfunc-object-params: ["error", "asc", { requiredFirst: true }] */

export const MyComponent = ({
  a = string;
  d = string;
  b? = string;
  c? = string;
}) => null;
```
