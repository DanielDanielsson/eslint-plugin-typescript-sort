import { sortInterface } from "./rules/sortInterface.ts";
import { sortType } from "./rules/sortType.ts";
import { sortEnum } from "./rules/sortEnum.ts";
import { sortArrowFuncObjectParams } from "./rules/sortArrowFuncObjectParams.ts";
import recommended from "./config/recommended.ts";

const rules = {
  interface: sortInterface,
  type: sortType,
  enum: sortEnum,
  "arrowfunc-object-params": sortArrowFuncObjectParams,
};

const config = {
  rules,
  configs: {
    recommended,
  },
};

export default config;
