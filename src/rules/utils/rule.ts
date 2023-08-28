import { ESLintUtils } from '@typescript-eslint/utils';
import {
  ReportDescriptor,
  RuleContext as UtilRuleContext,
  RuleListener,
  RuleMetaData as UtilRuleMetaData,
  RuleMetaDataDocs as UtilRuleMetaDataDocs,
  RuleModule,
} from '@typescript-eslint/utils/ts-eslint';

export type BaseOptions = readonly unknown[];

// "url" will be set automatically.
export type RuleMetaDataDocs = Omit<UtilRuleMetaDataDocs, 'url'>;

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
}): RuleModule<MessageIds, Options, RuleListener> =>
  ESLintUtils.RuleCreator(
    (name) =>
      `https://github.com/infctr/eslint-plugin-typescript-sort-keys/blob/master/docs/rules/${name}.md`,
  )(data);
