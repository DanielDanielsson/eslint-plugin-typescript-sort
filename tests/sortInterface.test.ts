/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleTester, noFormat } from '@typescript-eslint/rule-tester';
// import { parse } from 'flatted';
import { sortInterface } from '../src/rules/sortInterface';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run('sort-interface', sortInterface as any, {
  valid: [
    noFormat`interface Foo { a: string; b: string;}`,
    noFormat`interface Foo { a?: string; b?: string;}`,
    noFormat`interface Foo { a?: string; b: string;}`,
    noFormat`interface Foo extends Bar { a: string; b: string;}`,
    noFormat`interface Foo extends Bar { a?: string; b?: string;}`,
    noFormat`interface FooBarWithComment {
      a: string; // comment on a
      b: string; 
      c: string;
    }`,
    noFormat`interface Foo { a: string; b: string; c: string;}`,
    noFormat`interface Foo { a: string; b: string; c: string; d: string;}`,
    noFormat`interface Foo { a: string; b: string; c: string;}`,
    noFormat`export interface MyComponentProps {
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
    noFormat`export interface MyComponentProps {
      a?: string;
      b?: string;
      c?: string;
      d?: string;
      e?: {
        c: string;
        b: string;
        a: string;
      };
    }
    `,
  ],
  invalid: [
    {
      code: noFormat`interface Foo {
        b: string;
        a: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`interface Foo {
        a: string;
        b: string;
      }`,
    },
    {
      code: noFormat`interface Foo extends Bar {
        b: string;
        a: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`interface Foo extends Bar {
        a: string;
        b: string;
      }`,
    },
    {
      code: noFormat`interface Foo {
        b: string;
        a: string;
        c: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`interface Foo {
        a: string;
        b: string;
        c: string;
      }`,
    },
    {
      code: noFormat`interface Foo {
        b: string;
        a?: string;
        c: string;
      }`,
      errors: [{ messageId: 'invalidOrder' }],
      output: noFormat`interface Foo {
        a?: string;
        b: string;
        c: string;
      }`,
    },
  ],
});
