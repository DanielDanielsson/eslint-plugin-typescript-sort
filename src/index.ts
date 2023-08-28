import { sortInterface } from "./rules/sortInterface";
import { sortType } from "./rules/sortType";
import { sortEnum } from "./rules/sortEnum";
import { sortArrowFuncObjectParams } from "./rules/sortArrowFuncObjectParams";

const rules = {
  "sort-interface": sortInterface,
  "sort-type": sortType,
  "sort-enum": sortEnum,
  "sort-arrowfunc-object-params": sortArrowFuncObjectParams,
};

export default rules;
