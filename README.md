# eslint-plugin-typescript-sort

Sort interfaces, types, string enums and arrow function object parameters.

## Supported Rules

<!-- begin rule list -->
<!-- prettier-ignore -->
| Name | Description | Recommended | Fixable |
| ---- | ----------- | ------------------ | -------- |
| [`typescript-sort/interface`](./docs/interface.md) | Require interface keys to be sorted. | ✅ | :wrench: |
| [`typescript-sort/type`](./docs/type.md) | Require string type members to be sorted. | ✅ | :wrench: |
| [`typescript-sort/enum`](./docs/enum.md) | Require string enum members to be sorted. | ✅ | :wrench: |
| [`typescript-sort/arrowfunc-object-params`](./docs/arrowfunc-object-params.md) | Require objects inside arrow function parameters to be sorted. | ✅ | :wrench: |

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

Everything is configured in your `.eslintrc` configuration file

Specify the parser for typescript files:

```json
{
  "parser": "@typescript-eslint/parser"
}
```

### Option 1

Add `typescript-sort` to the plugins section. You can omit the `eslint-plugin-`:

```json
{
  "plugins": ["typescript-sort"]
}
```

Then configure the rules you want to use under the rules section:

```json
{
  "rules": {
    "typescript-sort/interface": "error",
    "typescript-sort/type": "error",
    "typescript-sort/enum": "error"
    "typescript-sort/arrow-func-object-params": "error"
  }
}
```

### Option 2

Enable all rules with recommended config:

```json
{
  "extends": ["plugin:typescript-sort/recommended"]
}
```

## Credits

Inspired by and sourced from [eslint/sort-keys](https://github.com/eslint/eslint/blob/main/docs/src/rules/sort-keys.md)
and [infectr/eslint-plugin-typescript-sort-keys](https://github.com/infctr/eslint-plugin-typescript-sort-keys/tree/master).
