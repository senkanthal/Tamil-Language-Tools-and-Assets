import regExpList from "./regExpData/object.js";
import availableRegExp from "./regExpData/availableRegExp.js";
import regExpHelper from "./regExpData/functions/index.js";
import applyMapping from "./applyMapping.js";
import type { RegExpListType } from "./regExpData/object.js";
import type { RegExpHelperType } from "./regExpData/functions/index.js";
import type { RegExpMapping } from "./applyMapping.js";

export { applyMapping, availableRegExp, regExpHelper, regExpList };

export type { RegExpHelperType, RegExpListType, RegExpMapping };
