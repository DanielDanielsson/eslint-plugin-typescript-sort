/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleTester, noFormat } from "@typescript-eslint/rule-tester";

import { processInvalidTestCase, processValidTestCase } from "./helpers/util";
import { sortType } from "../src/rules/sortType";
import { SortingOrder } from "../src/rules/common/options";

const parserResolver = require.resolve("@typescript-eslint/parser");

const ruleTester = new RuleTester({
  parser: parserResolver,
});

const valid = [
  /**
   * default, asc, caseSensitive
   */
  {
    code: noFormat`type T = {_:T; a:T; b:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; b:T; c:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; b:T; b_:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; b_:T; c:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {$:T; A:T; _:T; a:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {1:T; '11':T; 2:T; A:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {'#':T; 'Z':T; À:T; è:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * computed
   */
  {
    code: 'type T = {a:T; ["ab"]:T; b:T; c:T;}',
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * nested
   */
  {
    code: noFormat`type T = {a:T; b:{x:T; y:T;}; c:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type U = {a:T; b:{x:T; y:T;}; c:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type U = {a:T; b:{x:T; y:T; z:{i:T; j:T;};}; c:T;}`,
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * asc, insensitive
   */
  {
    code: noFormat`type T = {_:T; a:T; b:T;}`,
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {a:T; b:T; c:T;}`,
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {a:T; b:T; b_:T;}`,
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {b_:T; C:T; c:T;}`,
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {1:T; '11':T; 2:T; A:T;}`,
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },

  {
    code: noFormat`type T = {'#':T; 'Z':T; À:T; è:T;}`,
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: noFormat`type T = {_:T; a:T; b:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {a:T; b:T; c:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {a:T; b:T; b_:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; C:T; c:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {1:T; 2:T; '11':T; A:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {'#':T; 'Z':T; À:T; è:T;}`,
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },

  /**
   * asc, natural, insensitive, required
   */
  {
    code: noFormat`type T = {_:T; b:T; a?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; c:T; b?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {b:T; b_:T; a?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; c:T; b_?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {c:T; C:T; b_?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {$:T; _:T; A?:T; a?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {1:T; '11':T; A:T; 2?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {'Z':T; À:T; è:T; '#'?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },

  /**
   * asc, required
   */
  {
    code: noFormat`type T = {_:T; b:T; a?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {a:T; c:T; b?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {b:T; b_:T; a?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {C:T; c:T; b_?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {1:T; 11:T; 9:T; 111?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {$:T; _:T; A?:T; a?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {10:T; '11':T; 1?:T; 12?:T; 2?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {'Z':T; À:T; è:T; '#'?:T;}`,
    optionsSet: [[SortingOrder.Ascending, { requiredFirst: true }]],
  },

  /**
   * asc, natural, insensitive, not-required
   */
  {
    code: noFormat`type T = {_:T; a?:T; b:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; b?:T; c:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a?:T; b:T; b_:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_?:T; C:T; c:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_?:T; c:T; C:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {$:T; _:T; A?:T; a?:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {1:T;  2?:T; '11':T; A:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {'#'?:T; 'Z':T; À:T; è:T;}`,
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * desc
   */
  {
    code: noFormat`type T = {b:T; a:T; _:T;}`,
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {c:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {c:T; b_:T; C:T;}`,
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {a:T; _:T; A:T; $:T;}`,
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {A:T; 2:T; '11':T; 1:T;}`,
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {è:T; À:T; 'Z':T; '#':T;}`,
    optionsSet: [
      [SortingOrder.Descending],
      [SortingOrder.Descending, { caseSensitive: true }],
      [SortingOrder.Descending, { natural: false }],
      [SortingOrder.Descending, { caseSensitive: true, natural: false }],
    ],
  },

  /**
   * desc, insensitive
   */
  {
    code: noFormat`type T = {b:T; a:T; _:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {c:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {c:T; C:T; b_:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {C:T; c:T; b_:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {a:T; A:T; _:T; $:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {A:T; 2:T; '11':T; 1:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },
  {
    code: noFormat`type T = {è:T; À:T; 'Z':T; '#':T;}`,
    optionsSet: [
      [SortingOrder.Descending, { caseSensitive: false }],
      [SortingOrder.Descending, { caseSensitive: false, natural: false }],
    ],
  },

  /**
   * desc, natural
   */
  {
    code: noFormat`type T = {b:T; a:T; _:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: noFormat`type T = {c:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: noFormat`type T = {c:T; b_:T; C:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: noFormat`type T = {a:T; A:T; _:T; $:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: noFormat`type T = {A:T; '11':T; 2:T; 1:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },
  {
    code: noFormat`type T = {è:T; À:T; 'Z':T; '#':T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true }],
      [SortingOrder.Descending, { natural: true, caseSensitive: true }],
    ],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: noFormat`type T = {b:T; a:T; _:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {c:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; b:T; a:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {c:T; C:T; b_:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {C:T; c:T; b_:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {a:T; A:T; _:T; $:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {A:T; '11':T; 2:T; 1:T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {è:T; À:T; 'Z':T; '#':T;}`,
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },

  /**
   * desc, natural, insensitive, required
   */
  {
    code: noFormat`type T = {b:T; _:T; a?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {c:T; a:T; b?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_:T; b:T; a?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {c:T; C:T; b_?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; c:T; b_?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {_:T; $:T; a?:T; A?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = { A:T; '11':T; 1:T; 2?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {è:T; 'Z':T; À?:T; '#'?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },

  /**
   * desc, required
   */
  {
    code: noFormat`type T = {b:T; _:T; a?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {c:T; a:T; b?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {b_:T; b:T; a?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {c:T; C:T; b_?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {9:T; 11:T; 1:T; 111?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {_:T; $:T; a?:T; A?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {'11':T; 10:T; 2?:T; 12?:T; 1?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },
  {
    code: noFormat`type T = {è:T; À:T; 'Z':T; '#'?:T;}`,
    optionsSet: [[SortingOrder.Descending, { requiredFirst: true }]],
  },

  /**
   * desc, natural, insensitive, not-required
   */
  {
    code: noFormat`type T = {b:T; a?:T; _:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {c:T; b?:T; a:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_:T; b:T; a?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {c:T; C:T; b_?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; c:T; b_?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a?:T; A?:T; _:T; $:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {A:T; '11':T; 2?:T; 1:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {è:T; À:T; 'Z':T; '#'?:T;}`,
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * index signatures
   */
  {
    code: `type T<T> = { [nkey: number]: T; [skey: string]: T; $: T; A: T; _: T; a: T; }`,
    optionsSet: [[SortingOrder.Ascending]],
  },
  {
    code: `type T<T> = { a: T; _: T; A: T; $: T; [skey: string]: T; [nkey: number]: T; }`,
    optionsSet: [[SortingOrder.Descending]],
  },
];

const invalid = [
  /**
   * default (asc)
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {_:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {a:T; b:T; c:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {a:T; b_:T; b:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    output: "type T = {C:T; c:T; b_:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'C' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    output: "type T = {$:T; A:T; _:T; a:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'A' should be before '_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {1:T; 2:T; A:T; '11':T;}`,
    output: "type T = {1:T; '11':T; A:T; 2:T;}",
    errors: [
      "Expected type keys to be in ascending order. '11' should be before 'A'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {'#':T; 'Z':T; À:T; è:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * methods
   */
  {
    code: noFormat`type T = {1:T; 2:T; A():T; '11':T;}`,
    output: "type T = {1:T; '11':T; A():T; 2:T;}",
    errors: [
      "Expected type keys to be in ascending order. '11' should be before 'A'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {'#'():T; À():T; 'Z':T; è:T;}`,
    output: "type T = {'#'():T; 'Z':T; À():T; è:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * not ignore simple computed properties.
   */
  {
    code: 'type T = {a:T; b:T; ["a"]:T; c:T;}',
    output: 'type T = {a:T; ["a"]:T; b:T; c:T;}',
    errors: [
      "Expected type keys to be in ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * nested
   */
  //TODO: solve this one
  // Nested interfaces should also get sorted
  {
    code: noFormat`type T = {a:T; c: { y: string; x: string; }; b:T;}`,
    output: noFormat`type T = {a:T; b:T; c: { y: string; x: string; };}`,
    errors: [
      "Expected type keys to be in ascending order. 'x' should be before 'y'.",
      "Expected type keys to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  {
    code: noFormat`type U = {a:T; c:{y:T; x:T;}, b:T;}`,
    output: "type U = {a:T; b:T; c:{y:T; x:T;}}",
    errors: [
      "Expected type keys to be in ascending order. 'x' should be before 'y'.",
      "Expected type keys to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * asc
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {_:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {a:T; b:T; c:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {a:T; b_:T; b:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    output: "type T = {C:T; c:T; b_:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'C' should be before 'c'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    output: "type T = {$:T; A:T; _:T; a:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'A' should be before '_'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {1:T; 2:T; A:T; '11':T;}`,
    output: "type T = {1:T; '11':T; A:T; 2:T;}",
    errors: [
      "Expected type keys to be in ascending order. '11' should be before 'A'.",
    ],
    optionsSet: [
      [],
      [SortingOrder.Ascending],
      [SortingOrder.Ascending, { caseSensitive: true }],
      [SortingOrder.Ascending, { natural: false }],
      [SortingOrder.Ascending, { caseSensitive: true, natural: false }],
      [
        SortingOrder.Ascending,
        { caseSensitive: true, natural: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {'#':T; 'Z':T; À:T; è:T;}",
    errors: [
      "Expected type keys to be in ascending order. 'Z' should be before 'À'.",
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
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {_:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {a:T; b:T; c:T;}",
    errors: [
      "Expected type keys to be in insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {a:T; b_:T; b:T;}",
    errors: [
      "Expected type keys to be in insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {$:T; A:T; _:T; a:T;}`,
    output: "type T = {$:T; _:T; A:T; a:T;}",
    errors: [
      "Expected type keys to be in insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {1:T; 2:T; A:T; '11':T;}`,
    output: "type T = {1:T; '11':T; A:T; 2:T;}",
    errors: [
      "Expected type keys to be in insensitive ascending order. '11' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {'#':T; 'Z':T; À:T; è:T;}",
    errors: [
      "Expected type keys to be in insensitive ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { caseSensitive: false }]],
  },

  /**
   * asc, natural
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {_:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in natural ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {a:T; b:T; c:T;}",
    errors: [
      "Expected type keys to be in natural ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {a:T; b_:T; b:T;}",
    errors: [
      "Expected type keys to be in natural ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    output: "type T = {C:T; c:T; b_:T;}",
    errors: [
      "Expected type keys to be in natural ascending order. 'C' should be before 'c'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: noFormat`type T = {$:T; A:T; _:T; a:T;}`,
    output: "type T = {$:T; _:T; A:T; a:T;}",
    errors: [
      "Expected type keys to be in natural ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: noFormat`type T = {1:T; 2:T; A:T; '11':T;}`,
    output: "type T = {1:T; 2:T; '11':T; A:T;}",
    errors: [
      "Expected type keys to be in natural ascending order. '11' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {'#':T; 'Z':T; À:T; è:T;}",
    errors: [
      "Expected type keys to be in natural ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [[SortingOrder.Ascending, { natural: true }]],
  },

  /**
   * asc, natural, insensitive
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {_:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. '_' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {a:T; b:T; c:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'b' should be before 'c'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {a:T; b_:T; b:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'a' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {$:T; A:T; _:T; a:T;}`,
    output: "type T = {$:T; _:T; A:T; a:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {1:T; '11':T; 2:T; A:T;}`,
    output: "type T = {1:T; 2:T; '11':T; A:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. '2' should be before '11'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {'#':T; 'Z':T; À:T; è:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'Z' should be before 'À'.",
    ],
    optionsSet: [
      [SortingOrder.Ascending, { natural: true, caseSensitive: false }],
    ],
  },

  /**
   * asc, natural, insensitive, required
   */
  {
    code: noFormat`type T = {_:T; a?:T; b:T;}`,
    output: "type T = {_:T; b:T; a?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {a:T; b?:T; c:T;}`,
    output: "type T = {a:T; c:T; b?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. 'c' should be before 'b'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {b:T; a?:T; b_:T;}`,
    output: "type T = {b:T; b_:T; a?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. 'b_' should be before 'a'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; b_?:T; c:T;}`,
    output: "type T = {C:T; c:T; b_?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; b_?:T; c:T;}`,
    output: "type T = {C:T; c:T; b_?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {$:T; A?:T; _:T; a?:T;}`,
    output: "type T = {$:T; _:T; A?:T; a?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {1:T; '11':T; 2?:T; A:T;}`,
    output: "type T = {1:T; '11':T; A:T; 2?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. 'A' should be before '2'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {'Z':T; À:T; '#'?:T; è:T;}`,
    output: "type T = {'Z':T; À:T; è:T; '#'?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive ascending order. 'è' should be before '#'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },

  /**
   * asc, natural, insensitive, not-required
   */
  {
    code: noFormat`type T = {_:T; b:T; a?:T;}`,
    output: "type T = {_:T; a?:T; b:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b?:T; a:T; c:T;}`,
    output: "type T = {a:T; b?:T; c:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b:T; a?:T; b_:T;}`,
    output: "type T = {a?:T; b:T; b_:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'a' should be before 'b'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; c:T; b_?:T;}`,
    output: "type T = {b_?:T; c:T; C:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'b_' should be before 'c'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {C:T; b_?:T; c:T;}`,
    output: "type T = {b_?:T; C:T; c:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. 'b_' should be before 'C'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {$:T; A?:T; _:T; a?:T;}`,
    output: "type T = {$:T; _:T; A?:T; a?:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. '_' should be before 'A'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {1:T; '11':T; 2?:T; A:T;}`,
    output: "type T = {1:T; 2?:T; '11':T; A:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. '2' should be before '11'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {'Z':T; À:T; '#'?:T; è:T;}`,
    output: "type T = {'#'?:T; À:T; 'Z':T; è:T;}",
    errors: [
      "Expected type keys to be in natural insensitive ascending order. '#' should be before 'À'.",
    ],
    optionsSet: [
      [
        SortingOrder.Ascending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * desc
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {b:T; _:T; a:T;}",
    errors: [
      "Expected type keys to be in descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {c:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {b_:T; b:T; a:T;}",
    errors: [
      "Expected type keys to be in descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    output: "type T = {c:T; b_:T; C:T;}",
    errors: [
      "Expected type keys to be in descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    output: "type T = {a:T; _:T; A:T; $:T;}",
    errors: [
      "Expected type keys to be in descending order. '_' should be before '$'.",
      "Expected type keys to be in descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: noFormat`type T = {1:T; 2:T; A:T; '11':T;}`,
    output: "type T = {A:T; 2:T; 1:T; '11':T;}",
    errors: [
      "Expected type keys to be in descending order. '2' should be before '1'.",
      "Expected type keys to be in descending order. 'A' should be before '2'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected type keys to be in descending order. 'À' should be before '#'.",
      "Expected type keys to be in descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },

  /**
   * desc, insensitive
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {b:T; _:T; a:T;}",
    errors: [
      "Expected type keys to be in insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {c:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {b_:T; b:T; a:T;}",
    errors: [
      "Expected type keys to be in insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    output: "type T = {c:T; b_:T; C:T;}",
    errors: [
      "Expected type keys to be in insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    output: "type T = {A:T; _:T; $:T; a:T;}",
    errors: [
      "Expected type keys to be in insensitive descending order. '_' should be before '$'.",
      "Expected type keys to be in insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {1:T; 2:T; A:T; '11':T;}`,
    output: "type T = {A:T; 2:T; 1:T; '11':T;}",
    errors: [
      "Expected type keys to be in insensitive descending order. '2' should be before '1'.",
      "Expected type keys to be in insensitive descending order. 'A' should be before '2'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected type keys to be in insensitive descending order. 'À' should be before '#'.",
      "Expected type keys to be in insensitive descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { caseSensitive: false }]],
  },

  /**
   * desc, natural
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {b:T; _:T; a:T;}",
    errors: [
      "Expected type keys to be in natural descending order. 'b' should be before '_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {c:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in natural descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {b_:T; b:T; a:T;}",
    errors: [
      "Expected type keys to be in natural descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    output: "type T = {c:T; b_:T; C:T;}",
    errors: [
      "Expected type keys to be in natural descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    output: "type T = {a:T; _:T; A:T; $:T;}",
    errors: [
      "Expected type keys to be in natural descending order. '_' should be before '$'.",
      "Expected type keys to be in natural descending order. 'A' should be before '_'.",
      "Expected type keys to be in natural descending order. 'a' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: noFormat`type T = {1:T; 2:T; A:T; '11':T;}`,
    output: "type T = {A:T; 2:T; 1:T; '11':T;}",
    errors: [
      "Expected type keys to be in natural descending order. '2' should be before '1'.",
      "Expected type keys to be in natural descending order. 'A' should be before '2'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected type keys to be in natural descending order. 'À' should be before '#'.",
      "Expected type keys to be in natural descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [[SortingOrder.Descending, { natural: true }]],
  },

  /**
   * desc, natural, insensitive
   */
  {
    code: noFormat`type T = {a:T; _:T; b:T;}`,
    output: "type T = {b:T; _:T; a:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'b' should be before '_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {a:T; c:T; b:T;}`,
    output: "type T = {c:T; a:T; b:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'c' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; a:T; b:T;}`,
    output: "type T = {b_:T; b:T; a:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {b_:T; c:T; C:T;}`,
    output: "type T = {c:T; b_:T; C:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'c' should be before 'b_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {$:T; _:T; A:T; a:T;}`,
    output: "type T = {A:T; _:T; $:T; a:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. '_' should be before '$'.",
      "Expected type keys to be in natural insensitive descending order. 'A' should be before '_'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {1:T; 2:T; '11':T; A:T;}`,
    output: "type T = {A:T; 2:T; '11':T; 1:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. '2' should be before '1'.",
      "Expected type keys to be in natural insensitive descending order. '11' should be before '2'.",
      "Expected type keys to be in natural insensitive descending order. 'A' should be before '11'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },
  {
    code: noFormat`type T = {'#':T; À:T; 'Z':T; è:T;}`,
    output: "type T = {è:T; À:T; 'Z':T; '#':T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'À' should be before '#'.",
      "Expected type keys to be in natural insensitive descending order. 'è' should be before 'Z'.",
    ],
    optionsSet: [
      [SortingOrder.Descending, { natural: true, caseSensitive: false }],
    ],
  },

  /**
   * desc, natural, insensitive, required
   */
  {
    code: noFormat`type T = {_:T; a?:T; b:T;}`,
    output: "type T = {b:T; a?:T; _:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {b:T; a?:T; _:T;}`,
    output: "type T = {b:T; _:T; a?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. '_' should be before 'a'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {b:T; b_:T; a?:T;}`,
    output: "type T = {b_:T; b:T; a?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. 'b_' should be before 'b'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {c:T; b_?:T; C:T;}`,
    output: "type T = {c:T; C:T; b_?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_?:T; C:T; c:T;}`,
    output: "type T = {C:T; b_?:T; c:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {_:T; a?:T; $:T; A?:T;}`,
    output: "type T = {_:T; $:T; a?:T; A?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. '$' should be before 'a'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {2?:T; A:T; 1:T; '11':T;}`,
    output: "type T = {A:T; 2?:T; 1:T; '11':T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. 'A' should be before '2'.",
      "Expected type keys to be in required first natural insensitive descending order. '11' should be before '1'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {è:T; 'Z':T; '#'?:T; À?:T;}`,
    output: "type T = {è:T; 'Z':T; À?:T; '#'?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. 'À' should be before '#'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },
  {
    code: noFormat`type T = {À?:T; 'Z':T; '#'?:T; è:T;}`,
    output: "type T = {è:T; 'Z':T; '#'?:T; À?:T;}",
    errors: [
      "Expected type keys to be in required first natural insensitive descending order. 'Z' should be before 'À'.",
      "Expected type keys to be in required first natural insensitive descending order. 'è' should be before '#'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: true },
      ],
    ],
  },

  /**
   * desc, natural, insensitive, not-required
   */
  {
    code: noFormat`type T = {_:T; a?:T; b:T;}`,
    output: "type T = {b:T; a?:T; _:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'a' should be before '_'.",
      "Expected type keys to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {a?:T; b:T; _:T;}`,
    output: "type T = {b:T; a?:T; _:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'b' should be before 'a'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b:T; b_:T; a?:T;}`,
    output: "type T = {b_:T; b:T; a?:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'b_' should be before 'b'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {c:T; b_?:T; C:T;}`,
    output: "type T = {c:T; C:T; b_?:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {b_?:T; C:T; c:T;}`,
    output: "type T = {C:T; b_?:T; c:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'C' should be before 'b_'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {_:T; a?:T; $:T; A?:T;}`,
    output: "type T = {a?:T; _:T; $:T; A?:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'a' should be before '_'.",
      "Expected type keys to be in natural insensitive descending order. 'A' should be before '$'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {2?:T; A:T; 1:T; '11':T;}`,
    output: "type T = {A:T; 2?:T; 1:T; '11':T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'A' should be before '2'.",
      "Expected type keys to be in natural insensitive descending order. '11' should be before '1'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {è:T; 'Z':T; '#'?:T; À?:T;}`,
    output: "type T = {è:T; À?:T; '#'?:T; 'Z':T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'À' should be before '#'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },
  {
    code: noFormat`type T = {À?:T; 'Z':T; '#'?:T; è:T;}`,
    output: "type T = {è:T; 'Z':T; '#'?:T; À?:T;}",
    errors: [
      "Expected type keys to be in natural insensitive descending order. 'è' should be before '#'.",
    ],
    optionsSet: [
      [
        SortingOrder.Descending,
        { natural: true, caseSensitive: false, requiredFirst: false },
      ],
    ],
  },

  /**
   * index signatures
   */
  {
    code: noFormat`type T<T> = { A: T; [skey: string]: T; _: T; }`,
    output: "type T<T> = { [skey: string]: T; A: T; _: T; }",
    errors: [
      "Expected type keys to be in ascending order. '[index: skey]' should be before 'A'.",
    ],
    optionsSet: [[SortingOrder.Ascending]],
  },
  {
    code: noFormat`type T<T> = { _: T; [skey: string]: T; A: T; }`,
    output: "type T<T> = { _: T; A: T; [skey: string]: T; }",
    errors: [
      "Expected type keys to be in descending order. 'A' should be before '[index: skey]'.",
    ],
    optionsSet: [[SortingOrder.Descending]],
  },
];

ruleTester.run("type", sortType as any, {
  valid: processValidTestCase(valid) as any,
  invalid: processInvalidTestCase(invalid) as any,
});
