import { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createSortReporter } from "./utils/plugin";
import { createRule, RuleMetaData } from "./utils/rule";
import {
  sortingOrderOptionSchema,
  SortingOrder,
  ErrorMessage,
  SortingOrderOption,
  SortingParamsOptions,
} from "./common/options";

const getObjectBody = (node: TSESTree.TSTypeLiteral) =>
  node.type === AST_NODE_TYPES.TSTypeLiteral && node.members;
/**
 * The name of this rule.
 */
export const name = "type" as const;

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
 * The meta data for this rule.
 */
const meta: RuleMetaData<"invalidOrder"> = {
  type: "suggestion",
  docs: {
    description: "Require type keys to be sorted alphabetically.",
    recommended: "recommended",
  },
  messages: {
    invalidOrder: ErrorMessage.TypeInvalidOrder,
  },
  fixable: "code",
  schema,
};

/**
 * Create the rule.
 */
export const sortType = createRule<"invalidOrder", Options>({
  name,
  meta,
  defaultOptions,

  create(context) {
    const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
      loc,
      messageId: "invalidOrder",
    }));

    return {
      TSTypeLiteral(node) {
        const body = getObjectBody(node);

        return body && compareNodeListAndReport(body);
      },
    };
  },
});
