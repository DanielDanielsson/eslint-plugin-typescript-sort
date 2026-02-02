/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleTester, noFormat } from "@typescript-eslint/rule-tester";
import * as parser from "@typescript-eslint/parser";

import { processInvalidTestCase, processValidTestCase } from "./helpers/util";
import { sortArrowFuncObjectParams } from "../src/rules/sortArrowFuncObjectParams";
import { SortingOrder } from "../src/rules/common/options";

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
});

const valid = [
  {
    code: noFormat`export const MyComponent = ({
    a = 'default',
    b = 'default',
    c = 'default',
    d = 'default',
  }: MyComponentProps) => null;`,
    optionsSet: [[]],
  },
  {
    code: noFormat`export const MyComponent = ({
    a = 1,
    b = true,
    c = false,
    d = 'default',
  }: MyComponentProps) => null;`,
    optionsSet: [[]],
  },
  {
    code: noFormat`export const MyComponent = ({
    a = 1,
    b = true,
    c = false,
    d = 'default',
  }) => null;`,
    optionsSet: [[]],
  },
  {
    code: noFormat` const MyComponent = ({
    a = 1,
    b = true,
    c = false,
    d = 'default',
    ...rest
  }) => null;`,
    optionsSet: [[]],
  },
  {
    code: noFormat` const MyComponent = ({
    a,
    b,
    c,
    d,
  }) => null;`,
    optionsSet: [[]],
  },
  {
    code: noFormat` const MyComponent = ({
    a,
    b,
    c,
    d,
    ...rest
  }) => null;`,
    optionsSet: [[]],
  },

  /**
   * default (asc)
   */
  {
    code: noFormat`export const MyComponent = ({
      a = 'default',
      b = 'default',
      c = 'default',
      d = 'default',
    }: MyComponentProps) => null;`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`export const MyComponent = ({
      A = 'default',
      b = 'default',
      c = 'default',
      d = 'default',
    }: MyComponentProps) => null;`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`export const MyComponent = ({
      C = 'default',
      b = 'default',
      c = 'default',
      d = 'default',
    }: MyComponentProps) => null;`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`export const MyComponent = ({
      C = 'default',
      b = 'default',
      c = 'default',
      d = 'default',
    }: MyComponentProps) => null;`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`export const MyComponent = ({
      $="a",
      A="b",
      _="c",
      a="d",
    }: MyComponentProps) => null;`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`export const MyComponent = ({
      _="T",
      a="T",
      b="T",
    }: MyComponentProps) => null;`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", b="T", b_="T"}: MyComponentProps) => null;',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({C="T", b_="T", c="T"}: MyComponentProps) => null;',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({$="T", A="T", _="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * asc, insensitive
   */
  {
    code: 'export const MyComponent = ({_="T", a="T", b="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({a="T", b="T", b_="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", C="T", c="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: 'export const MyComponent = ({_="T", a="T", b="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", b="T", b_="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", C="T", c="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },

  /**
   * desc
   */
  {
    code: 'export const MyComponent = ({b="T", a="T", _="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({c="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({c="T", b_="T", C="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({a="T", _="T", A="T", $="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending]],
  },

  /**
   * desc, insensitive
   */
  {
    code: 'export const MyComponent = ({b="T", a="T", _="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({c="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({c="T", C="T", b_="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({C="T", c="T", b_="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({a="T", A="T", _="T", $="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },

  /**
   * desc, natural
   */
  {
    code: 'export const MyComponent = ({b="T", a="T", _="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({c="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({c="T", b_="T", C="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({a="T", A="T", _="T", $="T"}: MyComponentProps) => null;',
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: 'export const MyComponent = ({b="T", a="T", _="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({c="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({c="T", C="T", b_="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({C="T", c="T", b_="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", A="T", _="T", $="T"}: MyComponentProps) => null;',
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
];

const invalid = [
  /**
   * default (asc)
   */
  {
    code: noFormat`export const MyComponent = ({
      b="T",
      a="T",
      c="T",
    }: MyComponentProps) => null;`,
    output: noFormat`export const MyComponent = ({
      a="T",
      b="T",
      c="T",
    }: MyComponentProps) => null;`,
    errors: [
      "Expected arrow function object properties to be in ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b_="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({C="T", c="T", b_="T",}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'C' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({$="T", A="T", _="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'A' should be before '_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  /**
   * not ignore simple computed properties.
   */

  /**
   * asc
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({_="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b_="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({C="T", c="T", b_="T",}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'C' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({$="T", A="T", _="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in ascending order. 'A' should be before '_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * asc, insensitive
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({_="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b_="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({$="T", A="T", _="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },

  /**
   * asc, natural
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({_="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b_="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({C="T", c="T", b_="T",}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural ascending order. 'C' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({$="T", A="T", _="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({_="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b="T", c="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", b_="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({$="T", A="T", _="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },

  /**
   * desc
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b="T", _="T", a="T",}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", b_="T", C="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", _="T", A="T", $="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in descending order. '_' should be before '$'.",
      "Expected arrow function object properties to be in descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },

  /**
   * desc, insensitive
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b="T", _="T", a="T",}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", b_="T", C="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({A="T", _="T", $="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in insensitive descending order. '_' should be before '$'.",
      "Expected arrow function object properties to be in insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },

  /**
   * desc, natural
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b="T", _="T", a="T",}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", b_="T", C="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({a="T", _="T", A="T", $="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural descending order. '_' should be before '$'.",
      "Expected arrow function object properties to be in natural descending order. 'A' should be before '_'.",
      "Expected arrow function object properties to be in natural descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: 'export const MyComponent = ({a="T", _="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b="T", _="T", a="T",}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({a="T", c="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", a="T", b="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", a="T", b="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({b_="T", b="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({b_="T", c="T", C="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({c="T", b_="T", C="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: 'export const MyComponent = ({$="T", _="T", A="T", a="T"}: MyComponentProps) => null;',
    output:
      'export const MyComponent = ({A="T", _="T", $="T", a="T"}: MyComponentProps) => null;',
    errors: [
      "Expected arrow function object properties to be in natural insensitive descending order. '_' should be before '$'.",
      "Expected arrow function object properties to be in natural insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
];

ruleTester.run("enum", sortArrowFuncObjectParams as any, {
  valid: processValidTestCase(valid) as any,
  invalid: processInvalidTestCase(invalid) as any,
});
