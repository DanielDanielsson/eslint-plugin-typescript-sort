import { sortInterface } from "./rules/sortInterface";
import { sortType } from "./rules/sortType";
import { sortEnum } from "./rules/sortEnum";
import { sortArrowFuncObjectParams } from "./rules/sortArrowFuncObjectParams";
import recommended from "./config/recommended";

const rules = {
  interface: sortInterface,
  type: sortType,
  enum: sortEnum,
  "arrowfunc-object-params": sortArrowFuncObjectParams,
};

const plugin = {
  meta: {
    name: "eslint-plugin-typescript-sort",
    version: "0.2.0",
  },
  rules,
  configs: {} as Record<string, unknown>,
};

// Legacy config
plugin.configs.recommended = recommended;

// Flat config (self-referential)
plugin.configs["flat/recommended"] = {
  name: "typescript-sort/flat/recommended",
  plugins: { "typescript-sort": plugin },
  rules: {
    "typescript-sort/interface": "error",
    "typescript-sort/type": "error",
    "typescript-sort/enum": "error",
    "typescript-sort/arrowfunc-object-params": "error",
  },
};

export default plugin;
