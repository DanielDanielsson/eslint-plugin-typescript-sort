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

const config = {
  rules,
  configs: {
    recommended,
  },
};

export default config;
