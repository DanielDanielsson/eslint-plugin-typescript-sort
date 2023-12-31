# eslint-plugin-typescript-sort

Streamlines coding style consistency and code readability by sorting interfaces, types, string enums, and object parameters within arrow functions.

```sh
npm i --save-dev eslint-plugin-typescript-sort
```

`Tip:` Configure your IDE to auto-format code on save according to ESLint rules, reducing the need for manual sorting and enhancing your coding workflow. [Here's a guide on how to do it in VSCode.](https://github.com/DanielDanielsson/Docs/blob/main/VSCode%20eslint%20format%20on%20save)

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

You'll first need to install [eslint](https://www.npmjs.com/package/eslint), [typescript](https://www.npmjs.com/package/typescript) and [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)

```sh
npm i --save-dev eslint typescript @typescript-eslint/parser
```

Then, install `eslint-plugin-typescript-sort`:

```sh
npm i --save-dev eslint-plugin-typescript-sort
```

## Usage

Everything is configured in your `.eslintrc` configuration file

Specify the parser for typescript files:

```json
{
  "parser": "@typescript-eslint/parser"
}
```

### Option 1

Add `typescript-sort` to the plugins section. You can omit the `eslint-plugin-` part:

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
    "typescript-sort/arrowfunc-object-params": "error"
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

## Rules options

To see custom options for each rules, see the rule's [`documentation page`](./docs/index.md).

E.g. typescript-sort/interface has options for case sensitivity, natural order and required first.

```json
{
  "typescript-sort/interface": [
    "error",
    "asc",
    { "caseSensitive": true, "natural": false, "requiredFirst": false }
  ]
}
```

## Credits

Inspired by and sourced from [eslint/sort-keys](https://github.com/eslint/eslint/blob/main/docs/src/rules/sort-keys.md)
and [infectr/eslint-plugin-typescript-sort-keys](https://github.com/infctr/eslint-plugin-typescript-sort-keys/tree/master).
