import ts from "typescript";
import { addImport } from "../src/utils/ast";

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  omitTrailingSemicolon: false,
});

const resultFile = ts.createSourceFile(
  "someFileName.ts",
  "",
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
);

const s1 = ["Account", "AccountSchema"];
const s2 = "./schemas/account.schema";
const node = addImport(s1, s2);

const result = printer.printNode(ts.EmitHint.Unspecified, node, resultFile);
console.log(result);
