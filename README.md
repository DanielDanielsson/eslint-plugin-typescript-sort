# eslint-plugin-typescript-sort

Sort interfaces, types, string enums and arrow function object props.

## Supported Rules

<!-- begin rule list -->
<!-- prettier-ignore -->
| Name | Description | Recommended | Fixable |
| ---- | ----------- | ------------------ | -------- |
| [`typescript-sort/interface`](./docs/interface.md) | Require interface keys to be sorted. | ✅ | :wrench: |
| [`typescript-sort/sort-type`](./docs/sort-type.md) | Require string type members to be sorted. | ✅ | :wrench: |
| [`typescript-sort/sort-enum`](./docs/sort-enum.md) | Require string enum members to be sorted. | ✅ | :wrench: |
| [`typescript-sort/sort-arrow-func-object-props`](./docs/sort-arrow-func-object-props.md) | Require objects inside arrow function parameters to be sorted. | ✅ | :wrench: |

<!-- end rule list -->

## Installation

You'll first need to install

- [eslint](http://eslint.org)
- [typescript](http://www.typescriptlang.org/)
- [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)

```sh
npm i --save-dev eslint typescript @typescript-eslint/parser
```

Next, install `eslint-plugin-typescript-sort`:

```sh
npm i --save-dev eslint-plugin-typescript-sort
```

**Note:** If you installed ESLint globally then you must also install `eslint-plugin-typescript-sort` globally.

## Usage

Specify the parser for typescript files in your `.eslintrc` configuration file:

```json
{
  "parser": "@typescript-eslint/parser"
}
```

Add `typescript-sort` to the plugins section. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["typescript-sort"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "typescript-sort/sort-interface": "error",
    "typescript-sort/sort-type": "error",
    "typescript-sort/sort-enum": "error"
    "typescript-sort/sort-arrow-func-object-params": "error"
  }
}
```

Or enable all rules with defaults

```json
{
  "extends": ["plugin:typescript-sort/recommended"]
}
```

Inspired by and sourced from [eslint/sort-keys](https://github.com/eslint/eslint/blob/main/docs/src/rules/sort-keys.md)
and [infectr/eslint-plugin-typescript-sort-keys](https://github.com/infctr/eslint-plugin-typescript-sort-keys/tree/master).
