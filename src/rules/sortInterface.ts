/* eslint-disable import/no-default-export */
import { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createSortReporter } from "./utils/plugin.ts";
import { createRule, RuleMetaData } from "./utils/rule.ts";
import {
  sortingOrderOptionSchema,
  SortingOrder,
  ErrorMessage,
  SortingOrderOption,
  SortingParamsOptions,
} from "./common/options.ts";

const getObjectBody = (node: TSESTree.TSInterfaceDeclaration) =>
  node.type === AST_NODE_TYPES.TSInterfaceDeclaration && node.body.body;

/**
 * The name of this rule.
 */
export const name = "interface" as const;

type SortingParams = SortingParamsOptions["caseSensitive"] &
  SortingParamsOptions["natural"] &
  SortingParamsOptions["requiredFirst"];

/**
 * The options this rule can take.
 */
export type Options =
  | [SortingOrderOption]
  | [SortingOrderOption, Partial<SortingParams>];

const sortingParamsOptionSchema: JSONSchema4 = {
  type: "object",
  properties: {
    caseSensitive: {
      type: "boolean",
    },
    natural: {
      type: "boolean",
    },
    requiredFirst: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};

/**
 * The schema for the rule options.
 */
const schema: JSONSchema4[] = [
  sortingOrderOptionSchema,
  sortingParamsOptionSchema,
];

/**
 * The default options for the rule.
 */
const defaultOptions: Options = [
  SortingOrder.Ascending,
  { caseSensitive: true, natural: false, requiredFirst: false },
];

/**
 * The possible error messages.
 */
const errorMessages = {
  invalidOrder: ErrorMessage.InterfaceInvalidOrder,
} as const;

/**
 * The meta data for this rule.
 */
const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: "suggestion",
  docs: {
    description: "Require interface keys to be sorted alphabetically.",
    recommended: "recommended",
  },
  messages: errorMessages,
  fixable: "code",
  schema,
};

/**
 * Create the rule.
 */
export const sortInterface = createRule<keyof typeof errorMessages, Options>({
  name,
  meta,
  defaultOptions,

  create(context) {
    const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
      loc,
      messageId: "invalidOrder",
    }));

    return {
      TSInterfaceDeclaration(node) {
        const body = getObjectBody(node);
        return compareNodeListAndReport(body);
      },
    };
  },
});
