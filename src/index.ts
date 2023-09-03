import { sortInterface } from "./rules/sortInterface.ts";
import { sortType } from "./rules/sortType.ts";
import { sortEnum } from "./rules/sortEnum.ts";
import { sortArrowFuncObjectParams } from "./rules/sortArrowFuncObjectParams.ts";

const rules = {
  "sort-interface": sortInterface,
  "sort-type": sortType,
  "sort-enum": sortEnum,
  "sort-arrowfunc-object-params": sortArrowFuncObjectParams,
};

const config = {
  rules,
};

export default config;
