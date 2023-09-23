/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleTester, noFormat } from "@typescript-eslint/rule-tester";
import { sortEnum } from "../src/rules/sortEnum"; // Import your sortEnum rule

const parserResolver = require.resolve("@typescript-eslint/parser");

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run("enum", sortEnum as any, {
  valid: [
    noFormat`enum a { a, b }`,
    noFormat`enum b { a, b, c }`,
    noFormat`enum Sizes { Large, Medium, Small }`,
    noFormat`enum Days { Friday, Monday, Thursday, Tuesday, Wednesday }`,
    noFormat`enum Status { Active, Inactive }`,
    noFormat`enum Priority { High, Low, Medium }`,
    noFormat`enum Fruit { Apple, Banana, Grape, Orange }`,
  ],
  invalid: [
    {
      code: noFormat`enum e { b, a }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum e { a, b }`,
    },
    {
      code: noFormat`enum e { b, a, c }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum e { a, b, c }`,
    },
    {
      code: noFormat`enum E { B, A, C }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum E { A, B, C }`,
    },
    {
      code: noFormat`enum Fruits { Banana, Apple, Orange }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum Fruits { Apple, Banana, Orange }`,
    },
    {
      code: noFormat`enum e { b = "b", a = "a" }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum e { a = "a", b = "b" }`,
    },
    {
      code: noFormat`enum e { b = "b", a = "a", c = "c" }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum e { a = "a", b = "b", c = "c" }`,
    },
    {
      code: noFormat`enum E { B = "b", A = "a", C = "c" }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum E { A = "a", B = "b", C = "c" }`,
    },
    {
      code: noFormat`enum Fruits { Banana = "banana", Apple = "apple", Orange = "orange" }`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`enum Fruits { Apple = "apple", Banana = "banana", Orange = "orange" }`,
    },
  ],
});
