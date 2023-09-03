'use strict';

var utils = require('@typescript-eslint/utils');
var assert = require('assert');
var naturalCompare = require('natural-compare-lite');

var SortingOrder;
(function (SortingOrder) {
    SortingOrder["Ascending"] = "asc";
    SortingOrder["Descending"] = "desc";
})(SortingOrder || (SortingOrder = {}));
const sortingOrderOptionSchema = {
    type: 'string',
    enum: [SortingOrder.Ascending, SortingOrder.Descending],
};
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["DefaultPropsInvalidOrder"] = "Expected default props to component to be in {{ requiredFirst }}{{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.";
    ErrorMessage["InterfaceInvalidOrder"] = "Expected interface keys to be in {{ requiredFirst }}{{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.";
    ErrorMessage["StringEnumInvalidOrder"] = "Expected string enum members to be in {{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.";
    ErrorMessage["TypeInvalidOrder"] = "Expected type keys to be in {{ requiredFirst }}{{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.";
})(ErrorMessage || (ErrorMessage = {}));

const nameToIndexSignature = (x) => `[index: ${x}]`;
const indexSignatureRegexp = new RegExp(`^${nameToIndexSignature('.+')}`.replace('[', '\\[').replace(']', '\\]'));
const indexSignature = {
    create: nameToIndexSignature,
    regex: indexSignatureRegexp,
};

const getProperty = (node) => {
    switch (node.type) {
        case utils.AST_NODE_TYPES.TSIndexSignature: {
            const [identifier] = node.parameters;
            return Object.assign(Object.assign({}, identifier), { 
                // Override name for error message readability and weight calculation
                name: indexSignature.create(identifier.name) });
        }
        case utils.AST_NODE_TYPES.TSPropertySignature:
        case utils.AST_NODE_TYPES.Property:
            return node.key;
        case utils.AST_NODE_TYPES.TSMethodSignature:
            return node.key;
        case utils.AST_NODE_TYPES.TSEnumMember:
            return node.id;
        default:
            return undefined;
    }
};
/**
 * Gets the property name of the given `Property` node.
 *
 * - If the property's key is an `Identifier` node, this returns the key's name
 *   whether it's a computed property or not.
 * - If the property has a static name, this returns the static name.
 * - Otherwise, this returns undefined.
 *
 *     a.b           // => "b"
 *     a["b"]        // => "b"
 *     a['b']        // => "b"
 *     a[`b`]        // => "b"
 *     a[100]        // => "100"
 *     a[b]          // => undefined
 *     a["a" + "b"]  // => undefined
 *     a[tag`b`]     // => undefined
 *     a[`${b}`]     // => undefined
 *
 *     let a = {b: 1}            // => "b"
 *     let a = {["b"]: 1}        // => "b"
 *     let a = {['b']: 1}        // => "b"
 *     let a = {[`b`]: 1}        // => "b"
 *     let a = {[100]: 1}        // => "100"
 *     let a = {[b]: 1}          // => undefined
 *     let a = {["a" + "b"]: 1}  // => undefined
 *     let a = {[tag`b`]: 1}     // => undefined
 *     let a = {[`${b}`]: 1}     // => undefined
 */
const getPropertyName = (node) => {
    const property = getProperty(node);
    if (!property) {
        return undefined;
    }
    switch (property.type) {
        case utils.AST_NODE_TYPES.Literal:
            return String(property.value);
        case utils.AST_NODE_TYPES.Identifier:
            return property.name;
        default:
            return undefined;
    }
};
const getPropertyIsOptional = (node) => {
    switch (node.type) {
        case utils.AST_NODE_TYPES.TSMethodSignature:
        case utils.AST_NODE_TYPES.TSPropertySignature:
            return Boolean(node.optional);
    }
    return false;
};

const charCompare = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (b < a) {
        return 1;
    }
    return 0;
};
const getWeight = (value) => {
    switch (true) {
        // Custom name for index signature used here
        case indexSignature.regex.test(value):
            return 100;
        default:
            return 0;
    }
};
const weightedCompare = (a, b, compareFn) => compareFn(a, b) - getWeight(a) + getWeight(b);
const ascending = (a, b) => weightedCompare(a, b, charCompare);
const ascendingInsensitive = (a, b) => weightedCompare(a.toLowerCase(), b.toLowerCase(), charCompare);
const ascendingNatural = (a, b) => weightedCompare(a, b, naturalCompare);
const ascendingInsensitiveNatural = (a, b) => weightedCompare(a.toLowerCase(), b.toLowerCase(), naturalCompare);
/**
 * Functions which check that the given 2 names are in specific order.
 */
const compareFn = (isAscending, isInsensitive, isNatural) => (...args) => {
    if (args.filter(Boolean).length !== 2) {
        return 0;
    }
    const input = (isAscending ? args : args.reverse());
    if (isInsensitive && isNatural) {
        return ascendingInsensitiveNatural(...input);
    }
    if (!isInsensitive && isNatural) {
        return ascendingNatural(...input);
    }
    if (isInsensitive && !isNatural) {
        return ascendingInsensitive(...input);
    }
    return ascending(...input);
};

const createNodeSwapper = (context) => {
    const sourceCode = context.getSourceCode();
    /**
     * Returns the indent range of a node if it's the first on its line.
     * Otherwise, returns a range starting immediately after the previous sibling.
     */
    const getIndentRange = (node) => {
        const prevSibling = sourceCode.getTokenBefore(node);
        const end = node.range[0];
        const start = prevSibling && prevSibling.loc.start.line === node.loc.start.line
            ? prevSibling.range[1] + 1
            : node.range[0] - node.loc.start.column;
        return [start, end];
    };
    const getRangeWithIndent = (node) => [
        getIndentRange(node)[0],
        node.range[1],
    ];
    /**
     * Returns the range for the entire line, including EOL, if node is the only
     * token on its lines. Otherwise, returns the node range.
     */
    const getLineRange = (node) => {
        const [start] = getRangeWithIndent(node);
        const index = sourceCode.lineStartIndices.findIndex((n) => start === n);
        if (index < 0) {
            // Node is not at the beginning of the line
            return node.range;
        }
        const lines = 1 + node.loc.end.line - node.loc.start.line;
        return [
            sourceCode.lineStartIndices[index],
            sourceCode.lineStartIndices[index + lines],
        ];
    };
    const getIndentText = (node) => sourceCode.text.slice(...getIndentRange(node));
    const getNodePunctuator = (node) => {
        const punctuator = sourceCode.getTokenAfter(node, {
            filter: (n) => n.type === utils.AST_TOKEN_TYPES.Punctuator && n.value !== ":",
            includeComments: false,
        });
        // Check the punctuator value outside of filter because we
        // want to stop traversal on any terminating punctuator
        return punctuator && /^[,;]$/.test(punctuator.value)
            ? punctuator
            : undefined;
    };
    return (fixer, nodePositions, currentNode, replaceNode) => [currentNode, replaceNode].reduce((acc, node) => {
        var _a, _b, _c;
        const otherNode = node === currentNode ? replaceNode : currentNode;
        const comments = sourceCode.getCommentsBefore(node);
        const nextSibling = sourceCode.getTokenAfter(node);
        const isLastReplacingLast = ((_a = nodePositions.get(node)) === null || _a === void 0 ? void 0 : _a.final) === nodePositions.size - 1 &&
            ((_b = nodePositions.get(node)) === null || _b === void 0 ? void 0 : _b.final) ===
                ((_c = nodePositions.get(otherNode)) === null || _c === void 0 ? void 0 : _c.initial);
        let text = [
            comments.length ? getIndentText(node) : "",
            sourceCode.getText(node),
        ].join("");
        // If nextSibling is the node punctuator, remove it
        if (nextSibling === getNodePunctuator(node)) {
            acc.push(fixer.remove(nextSibling));
        }
        if (!/[,;]$/.test(text)) {
            // Add a punctuator if the node doesn't already have one
            text += ",";
        }
        if (isLastReplacingLast) {
            // If we're moving the last node to its final destination, we can remove the punctuator
            text = text.replace(/,$/, "");
        }
        if (comments.length) {
            // Insert leading comments above the other node
            acc.push(fixer.insertTextBefore(otherNode, comments
                .map((comment) => sourceCode.getText(comment))
                .concat("")
                .join("\n")));
        }
        acc.push(
        // Insert the node before the other node
        fixer.insertTextBefore(otherNode, text), 
        // Remove the original instance of node
        fixer.remove(node), 
        // Remove the original instances of node comments
        ...comments.map((n) => fixer.removeRange(getLineRange(n))));
        return acc;
    }, []);
};
const createSortReporter = (context, createReportObject) => {
    const order = context.options[0] || SortingOrder.Ascending;
    const options = context.options[1];
    const isAscending = order === SortingOrder.Ascending;
    const isInsensitive = !(options && options.caseSensitive);
    const isNatural = Boolean(options === null || options === void 0 ? void 0 : options.natural);
    const isRequiredFirst = Boolean(options === null || options === void 0 ? void 0 : options.requiredFirst);
    const compare = compareFn(isAscending, isInsensitive, isNatural);
    const swapNodes = createNodeSwapper(context);
    return (body) => {
        const sortedBody = isRequiredFirst
            ? [
                ...body
                    .slice(0)
                    .filter((node) => !getPropertyIsOptional(node))
                    .sort((a, b) => compare(getPropertyName(a), getPropertyName(b))),
                ...body
                    .slice(0)
                    .filter((node) => getPropertyIsOptional(node))
                    .sort((a, b) => compare(getPropertyName(a), getPropertyName(b))),
            ]
            : body
                .slice(0)
                .sort((a, b) => compare(getPropertyName(a), getPropertyName(b)));
        const nodePositions = new Map(body.map((n) => [
            n,
            { initial: body.indexOf(n), final: sortedBody.indexOf(n) },
        ]));
        for (let i = 1; i < body.length; i += 1) {
            const prevNode = body[i - 1];
            const currentNode = body[i];
            const prevNodeName = getPropertyName(prevNode);
            const currentNodeName = getPropertyName(currentNode);
            if ((!isRequiredFirst && compare(prevNodeName, currentNodeName) > 0) ||
                (isRequiredFirst &&
                    getPropertyIsOptional(prevNode) ===
                        getPropertyIsOptional(currentNode) &&
                    compare(prevNodeName, currentNodeName) > 0) ||
                (isRequiredFirst &&
                    getPropertyIsOptional(prevNode) !==
                        getPropertyIsOptional(currentNode) &&
                    getPropertyIsOptional(prevNode))) {
                const targetPosition = sortedBody.indexOf(currentNode);
                const replaceNode = body[targetPosition];
                const { loc, messageId } = createReportObject(currentNode);
                assert(loc, "createReportObject return value must include a node location");
                assert(messageId, "createReportObject return value must include a problem message");
                context.report({
                    loc,
                    messageId,
                    node: currentNode,
                    data: {
                        thisName: currentNodeName,
                        prevName: prevNodeName,
                        order,
                        insensitive: isInsensitive ? "insensitive " : "",
                        natural: isNatural ? "natural " : "",
                        requiredFirst: isRequiredFirst ? "required first " : "",
                    },
                    fix: (fixer) => {
                        if (currentNode !== replaceNode) {
                            return swapNodes(fixer, nodePositions, currentNode, replaceNode);
                        }
                        return null;
                    },
                });
            }
        }
    };
};

/**
 * Create a rule.
 */
const createRule = (data) => utils.ESLintUtils.RuleCreator((name) => `https://github.com/infctr/eslint-plugin-typescript-sort-keys/blob/master/docs/rules/${name}.md`)(data);

const getObjectBody$3 = (node) => node.type === utils.AST_NODE_TYPES.TSInterfaceDeclaration && node.body.body;
/**
 * The name of this rule.
 */
const name$3 = "interface";
const sortingParamsOptionSchema$3 = {
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
const schema$3 = [
    sortingOrderOptionSchema,
    sortingParamsOptionSchema$3,
];
/**
 * The default options for the rule.
 */
const defaultOptions$3 = [
    SortingOrder.Ascending,
    { caseSensitive: true, natural: false, requiredFirst: false },
];
/**
 * The possible error messages.
 */
const errorMessages = {
    invalidOrder: ErrorMessage.InterfaceInvalidOrder,
};
/**
 * The meta data for this rule.
 */
const meta$3 = {
    type: "suggestion",
    docs: {
        description: "Require interface keys to be sorted alphabetically.",
        recommended: "recommended",
    },
    messages: errorMessages,
    fixable: "code",
    schema: schema$3,
};
/**
 * Create the rule.
 */
const sortInterface = createRule({
    name: name$3,
    meta: meta$3,
    defaultOptions: defaultOptions$3,
    create(context) {
        const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
            loc,
            messageId: "invalidOrder",
        }));
        return {
            TSInterfaceDeclaration(node) {
                const body = getObjectBody$3(node);
                return compareNodeListAndReport(body);
            },
        };
    },
});

const getObjectBody$2 = (node) => node.type === utils.AST_NODE_TYPES.TSTypeLiteral && node.members;
/**
 * The name of this rule.
 */
const name$2 = "type";
const sortingParamsOptionSchema$2 = {
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
const schema$2 = [
    sortingOrderOptionSchema,
    sortingParamsOptionSchema$2,
];
/**
 * The default options for the rule.
 */
const defaultOptions$2 = [
    SortingOrder.Ascending,
    { caseSensitive: true, natural: false, requiredFirst: false },
];
/**
 * The meta data for this rule.
 */
const meta$2 = {
    type: "suggestion",
    docs: {
        description: "Require type keys to be sorted alphabetically.",
        recommended: "recommended",
    },
    messages: {
        invalidOrder: ErrorMessage.TypeInvalidOrder,
    },
    fixable: "code",
    schema: schema$2,
};
/**
 * Create the rule.
 */
const sortType = createRule({
    name: name$2,
    meta: meta$2,
    defaultOptions: defaultOptions$2,
    create(context) {
        const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
            loc,
            messageId: "invalidOrder",
        }));
        return {
            TSTypeLiteral(node) {
                const body = getObjectBody$2(node);
                return compareNodeListAndReport(body);
            },
        };
    },
});

const getObjectBody$1 = (node) => utils.AST_NODE_TYPES.TSEnumDeclaration && node.members;
/**
 * The name of this rule.
 */
const name$1 = "type";
const sortingParamsOptionSchema$1 = {
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
const schema$1 = [
    sortingOrderOptionSchema,
    sortingParamsOptionSchema$1,
];
/**
 * The default options for the rule.
 */
const defaultOptions$1 = [
    SortingOrder.Ascending,
    { caseSensitive: true, natural: false, requiredFirst: false },
];
/**
 * The meta data for this rule.
 */
const meta$1 = {
    type: "suggestion",
    docs: {
        description: "Require enum string keys to be sorted alphabetically.",
        recommended: "recommended",
    },
    messages: {
        invalidOrder: ErrorMessage.StringEnumInvalidOrder,
    },
    fixable: "code",
    schema: schema$1,
};
/**
 * Create the rule.
 */
const sortEnum = createRule({
    name: name$1,
    meta: meta$1,
    defaultOptions: defaultOptions$1,
    create(context) {
        const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
            loc,
            messageId: "invalidOrder",
        }));
        return {
            TSEnumDeclaration(node) {
                const body = getObjectBody$1(node);
                return compareNodeListAndReport(body);
            },
        };
    },
});

const getObjectBody = (node) => node.type === utils.AST_NODE_TYPES.ArrowFunctionExpression && node.params;
/**
 * The name of this rule.
 */
const name = "type";
const sortingParamsOptionSchema = {
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
const schema = [
    sortingOrderOptionSchema,
    sortingParamsOptionSchema,
];
/**
 * The default options for the rule.
 */
const defaultOptions = [
    SortingOrder.Ascending,
    { caseSensitive: true, natural: false, requiredFirst: false },
];
/**
 * The meta data for this rule.
 */
const meta = {
    type: "suggestion",
    docs: {
        description: "Require props in ArrowFunctionExpression object to be sorted alphabetically.",
        recommended: "recommended",
    },
    messages: {
        invalidOrder: ErrorMessage.DefaultPropsInvalidOrder,
    },
    fixable: "code",
    schema,
};
/**
 * Create the rule.
 */
const sortArrowFuncObjectParams = createRule({
    name,
    meta,
    defaultOptions,
    create(context) {
        const compareNodeListAndReport = createSortReporter(context, ({ loc }) => ({
            loc,
            messageId: "invalidOrder",
        }));
        return {
            ArrowFunctionExpression(node) {
                const body = getObjectBody(node);
                // Sort all objects in the body of the ArrowFunctionExpression
                body.forEach((subNode) => {
                    if (subNode.type === utils.AST_NODE_TYPES.ObjectPattern) {
                        const propertyArray = [];
                        // Make sure all properties are of type Property and have a key of type Identifier
                        subNode.properties.forEach((subProperty) => {
                            if (subProperty.type === "Property" &&
                                subProperty.key.type === "Identifier") {
                                propertyArray.push(subProperty);
                            }
                        });
                        return compareNodeListAndReport(propertyArray);
                    }
                    return null;
                });
                return null;
            },
        };
    },
});

const rules = {
    "sort-interface": sortInterface,
    "sort-type": sortType,
    "sort-enum": sortEnum,
    "sort-arrowfunc-object-params": sortArrowFuncObjectParams,
};
const config = {
    rules,
};

module.exports = config;
