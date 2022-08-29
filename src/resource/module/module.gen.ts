import ts from "typescript";
import { genClass, genImport } from "../../utils/ast";
import fs from "fs-extra";
import { ClassObj, ImportsArray } from "../../utils/code-gen.type";

/* To be moved to utils */
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

/* This function is used to generate Module code */
export function genModuleCode(
  importsArray: ImportsArray,
  classObj: ClassObj
): string {
  const nodeArray: ts.Statement[] = [];
  importsArray.forEach((importsObj: any) => {
    const node = genImport(importsObj.importItems, importsObj.importFrom);
    nodeArray.push(node);
  });

  nodeArray.push(genClass(classObj.name));

  const sourceFile = ts.factory.updateSourceFile(
    resultFile,
    ts.factory.createNodeArray(nodeArray)
  );

  return printer.printFile(sourceFile);
}

export function genModule(importsArray: ImportsArray, classObj: ClassObj) {
  const code = genModuleCode(importsArray, classObj);
  fs.writeFile(
    `${classObj.name.toLowerCase()}.module.ts`,
    code,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
}
