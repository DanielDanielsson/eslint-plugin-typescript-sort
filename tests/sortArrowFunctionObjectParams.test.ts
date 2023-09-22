/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleTester, noFormat } from "@typescript-eslint/rule-tester";
// import { parse } from 'flatted';
import { sortArrowFuncObjectParams } from "../src/rules/sortArrowFuncObjectParams";

const parserResolver = require.resolve("@typescript-eslint/parser");

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run("arrowfunc-object-params", sortArrowFuncObjectParams as any, {
  valid: [
    noFormat`export const MyComponent = ({
        a = 'default',
        b = 'default',
        c = 'default',
        d = 'default',
      }: MyComponentProps) => null;`,
    noFormat`export const MyComponent = ({
        a = 'default',
        b = 'default',
      }) => null;`,
  ],
  invalid: [
    {
      code: noFormat`export const MyComponent = ({
            b = 'default',
            a = 'default',
            c = 'default',
            d = 'default',
          }: MyComponentProps) => null;`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`export const MyComponent = ({
            a = 'default',
            b = 'default',
            c = 'default',
            d = 'default',
          }: MyComponentProps) => null;`,
    },
    {
      code: noFormat`export const MyComponent = ({
            b = 'default',
            a = 'default',
            c = 'default',
            d = 'default',
            ...rest,
          }: MyComponentProps) => null;`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`export const MyComponent = ({
            a = 'default',
            b = 'default',
            c = 'default',
            d = 'default',
            ...rest,
          }: MyComponentProps) => null;`,
    },
    {
      code: noFormat`export const MyComponent = ({
            a = 'default',
            b = 'default',
            d = 'default',
            c = 'default',
            ...rest,
          }: MyComponentProps) => null;`,
      errors: [{ messageId: "invalidOrder" }],
      output: noFormat`export const MyComponent = ({
            a = 'default',
            b = 'default',
            c = 'default',
            d = 'default',
            ...rest,
          }: MyComponentProps) => null;`,
    },
  ],
});
