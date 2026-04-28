import applyMapping from "../../applyMapping.js";
import regExpList, { RegExpListType } from "../object.js";

type HelperName<Key extends string> = Key extends `Uni${infer Rest}`
  ? `UnicodeTo${Rest}`
  : `${Key}ToUnicode`;

export type RegExpHelperType = {
  [Key in keyof RegExpListType as HelperName<Key & string>]: (
    text: string,
  ) => string;
};

const toHelperName = (mappingName: string): string =>
  mappingName.startsWith("Uni")
    ? `UnicodeTo${mappingName.slice(3)}`
    : `${mappingName}ToUnicode`;

const regExpHelper = Object.fromEntries(
  Object.entries(regExpList).map(([mappingName, mapping]) => [
    toHelperName(mappingName),
    (text: string) => applyMapping(text, mapping),
  ]),
) as RegExpHelperType;

export default regExpHelper;
