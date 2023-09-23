import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

import { indexSignature } from "./common";

export const getObjectBody = (
  node:
    | TSESTree.TSEnumDeclaration
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSTypeLiteral
) => {
  switch (node.type) {
    case AST_NODE_TYPES.TSInterfaceDeclaration:
      return node.body.body;
    case AST_NODE_TYPES.TSEnumDeclaration:
    case AST_NODE_TYPES.TSTypeLiteral:
      return node.members;
    default:
  }
  return null;
};

const getProperty = (node: TSESTree.Node) => {
  switch (node.type) {
    case AST_NODE_TYPES.TSIndexSignature: {
      const [identifier] = node.parameters;

      return {
        ...identifier,
        // Override name for error message readability and weight calculation
        name: indexSignature.create(
          (identifier as TSESTree.Parameter & { name: string }).name
        ),
      };
    }

    case AST_NODE_TYPES.TSPropertySignature:
    case AST_NODE_TYPES.Property:
      return node.key;
    case AST_NODE_TYPES.TSMethodSignature:
      return node.key;

    case AST_NODE_TYPES.TSEnumMember:
      return node.id;

    default:
      return undefined;
  }
};

export const getPropertyName = (
  node:
    | TSESTree.TypeElement
    | TSESTree.TSEnumMember
    | TSESTree.Parameter
    | TSESTree.Property
) => {
  const property = getProperty(node);

  if (!property) {
    return undefined;
  }

  switch (property.type) {
    case AST_NODE_TYPES.Literal:
      return String(property.value);

    case AST_NODE_TYPES.Identifier:
      return property.name;

    default:
      return undefined;
  }
};

export const getPropertyIsOptional = (
  node:
    | TSESTree.TypeElement
    | TSESTree.TSEnumMember
    | TSESTree.Parameter
    | TSESTree.Property
) => {
  switch (node.type) {
    case AST_NODE_TYPES.TSMethodSignature:
    case AST_NODE_TYPES.TSPropertySignature:
      return Boolean(node.optional);
    default:
  }

  return false;
};
