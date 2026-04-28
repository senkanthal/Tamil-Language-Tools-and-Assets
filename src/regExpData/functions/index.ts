import applyMapping from "../../applyMapping.js";
import regExpList from "../object.js";

export type RegExpHelperType = Record<
  `${string}ToUnicode` | `UnicodeTo${string}`,
  (text: string) => string
>;

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
