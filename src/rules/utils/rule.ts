import { ESLintUtils } from '@typescript-eslint/utils';
import {
  ReportDescriptor,
  RuleContext as UtilRuleContext,
  RuleListener,
  RuleMetaData as UtilRuleMetaData,
  RuleMetaDataDocs as UtilRuleMetaDataDocs,
} from '@typescript-eslint/utils/ts-eslint';

export type BaseOptions = readonly unknown[];

// "url" will be set automatically. Add custom "recommended" field.
export type RuleMetaDataDocs = Omit<UtilRuleMetaDataDocs, 'url'> & {
  readonly recommended?: string;
};

// "docs.url" will be set automatically.
export type RuleMetaData<MessageIds extends string> = {
  readonly docs: RuleMetaDataDocs;
} & Omit<UtilRuleMetaData<MessageIds>, 'docs'>;

export type RuleResult<
  MessageIds extends string,
  Options extends BaseOptions,
> = {
  readonly context: UtilRuleContext<MessageIds, Options>;
  readonly descriptors: readonly ReportDescriptor<MessageIds>[];
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Create a rule.
 */
export const createRule = <
  MessageIds extends string,
  Options extends BaseOptions,
>(data: {
  readonly create: (
    context: UtilRuleContext<MessageIds, Options>,
    optionsWithDefault: Mutable<Options>,
  ) => RuleListener;
  readonly defaultOptions: Options;
  readonly meta: RuleMetaData<MessageIds>;
  readonly name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): any =>
  ESLintUtils.RuleCreator(
    (name) =>
      `https://github.com/DanielDanielsson/eslint-plugin-typescript-sort/blob/master/docs/rules/${name}.md`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  )(data as any);
