import regExpList, { RegExpListType } from "./object.js";

const availableRegExp = Object.keys(regExpList) as (keyof RegExpListType)[];

export default availableRegExp;
