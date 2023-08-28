/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleTester as ESLintRuleTester } from 'eslint';
import { filename } from './configs';

type OptionsSet<Options extends any[]> = {
  /**
   * The set of options this test case should pass for.
   */
  readonly optionsSet: readonly (Options | [])[];
};

export type ValidTestCase<Options extends any[]> = Omit<
  ESLintRuleTester.ValidTestCase,
  'options'
> &
  OptionsSet<Options>;

export type InvalidTestCase<Options extends any[]> = Omit<
  ESLintRuleTester.InvalidTestCase,
  'options'
> &
  OptionsSet<Options>;

/**
 * Convert our test cases into ones eslint test runner is expecting.
 */
export const processInvalidTestCase = (
  testCases: readonly InvalidTestCase<any>[],
): ESLintRuleTester.InvalidTestCase[] =>
  testCases.flatMap((testCase) =>
    testCase.optionsSet.map((options) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { optionsSet, ...eslintTestCase } = testCase;

      return { filename, ...eslintTestCase, options };
    }),
  );

/**
 * Convert our test cases into ones eslint test runner is expecting.
 */
export const processValidTestCase = (
  testCases: readonly ValidTestCase<any>[],
): ESLintRuleTester.ValidTestCase[] => processInvalidTestCase(testCases as any);
