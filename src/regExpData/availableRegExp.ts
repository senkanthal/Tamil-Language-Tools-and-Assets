import regExpList from "./object.js";
import type { RegExpListType } from "./object.js";

const availableRegExp = Object.keys(regExpList) as (keyof RegExpListType)[];

export default availableRegExp;
