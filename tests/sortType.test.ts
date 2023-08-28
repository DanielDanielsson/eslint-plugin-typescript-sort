/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleTester, noFormat } from '@typescript-eslint/rule-tester';
// import { parse } from 'flatted';
import { sortType } from '../src/rules/sortType';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run('sort-type', sortType as any, {
  valid: [
    noFormat`type Foo = { a: string; b: string;}`,
    noFormat`type Foo = { a?: string; b?: string;}`,
    noFormat`type Foo = { a?: string; b: string;}`,
    noFormat`type Foo = { a: string; b: string;}`,
    noFormat`type Foo = {
      a: string; // comment on a
      b: string; 
      c: string;
    }`,
    noFormat`type Foo = { a: string; b: string; c: string;}`,
    noFormat`type Foo = { a: string; b: string; c: string; d: string;}`,
    noFormat`type Foo = { a: string; b: string; c: string;}`,
    noFormat`export type MyComponentProps = {
      a?: string;
      b?: string;
      c?: string;
      d?: string;
      e?: {
        a: string;
        b: string;
        c: string;
      };
    }
    `,
    noFormat`export type MyComponentProps = {
      a?: string;
      b?: string;
      c?: string;
      d?: string;
      e?: {
          a: string;
          b: string;
          c: string;
      };
    }
    `,
  ],
  invalid: [
    {
      code: noFormat`type Foo = {
        b: string;
        a: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`type Foo = {
        a: string;
        b: string;
      }`,
    },
    {
      code: noFormat`type Foo = {
        b: string;
        a: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`type Foo = {
        a: string;
        b: string;
      }`,
    },
    {
      code: noFormat`type Foo = {
        b: string;
        a: string;
        c: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`type Foo = {
        a: string;
        b: string;
        c: string;
      }`,
    },
    {
      code: noFormat`type Foo = {
        b: string;
        a?: string;
        c: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`type Foo = {
        a?: string;
        b: string;
        c: string;
      }`,
    },
    // TODO: Comments are not part of the TS AST, so we can't fix this yet.
    // {
    //   code: noFormat`type Foo = {
    //     b: string; // comment on b
    //     a: string;
    //     c: string;
    //   }`,
    //   errors: [{ messageId: 'invalidOrder' }],
    //   output: noFormat`type Foo = {
    //     a: string;
    //     b: string; // comment on b
    //     c: string;
    //   }`,
    // },
  ],
});
