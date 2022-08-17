import ts = require("typescript");

function makeFactorialFunction() {
  return ts.factory.createClassDeclaration(
    [
      ts.factory.createDecorator(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier("Module"),
          undefined,
          [
            ts.factory.createObjectLiteralExpression(
              [
                ts.factory.createPropertyAssignment(
                  ts.factory.createIdentifier("imports"),
                  ts.factory.createArrayLiteralExpression(
                    [ts.factory.createIdentifier("OrderModuleBase")],
                    false
                  )
                ),
                ts.factory.createPropertyAssignment(
                  ts.factory.createIdentifier("controllers"),
                  ts.factory.createArrayLiteralExpression(
                    [ts.factory.createIdentifier("OrderController")],
                    false
                  )
                ),
                ts.factory.createPropertyAssignment(
                  ts.factory.createIdentifier("providers"),
                  ts.factory.createArrayLiteralExpression(
                    [ts.factory.createIdentifier("OrderService")],
                    false
                  )
                ),
                ts.factory.createPropertyAssignment(
                  ts.factory.createIdentifier("exports"),
                  ts.factory.createArrayLiteralExpression(
                    [ts.factory.createIdentifier("OrderService")],
                    false
                  )
                ),
              ],
              true
            ),
          ]
        )
      ),
    ],
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier("OrderModule"),
    undefined,
    undefined,
    []
  );
}
const calssD = ts.factory.createClassDeclaration(
  [
    ts.factory.createDecorator(
      ts.factory.createCallExpression(
        ts.factory.createIdentifier("Module"),
        undefined,
        [
          ts.factory.createObjectLiteralExpression(
            [
              ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier("imports"),
                ts.factory.createArrayLiteralExpression(
                  [ts.factory.createIdentifier("OrderModuleBase")],
                  false
                )
              ),
              ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier("controllers"),
                ts.factory.createArrayLiteralExpression(
                  [ts.factory.createIdentifier("OrderController")],
                  false
                )
              ),
              ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier("providers"),
                ts.factory.createArrayLiteralExpression(
                  [ts.factory.createIdentifier("OrderService")],
                  false
                )
              ),
              ts.factory.createPropertyAssignment(
                ts.factory.createIdentifier("exports"),
                ts.factory.createArrayLiteralExpression(
                  [ts.factory.createIdentifier("OrderService")],
                  false
                )
              ),
            ],
            true
          ),
        ]
      )
    ),
  ],
  [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
  ts.factory.createIdentifier("OrderModule"),
  undefined,
  undefined,
  []
);

const importFile = ts.factory.createImportDeclaration(
  undefined,
  undefined,
  ts.factory.createImportClause(
    false,
    undefined,
    ts.factory.createNamedImports([
      ts.factory.createImportSpecifier(
        false,
        undefined,
        ts.factory.createIdentifier("Module")
      ),
    ])
  ),
  ts.factory.createStringLiteral("@nestjs/common"),
  undefined
);

const resultFile = ts.createSourceFile(
  "someFileName.ts",
  "",
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
);
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  omitTrailingSemicolon: false,
});

const result = printer.printNode(
  ts.EmitHint.Unspecified,
  makeFactorialFunction(),
  resultFile
);
// console.log(result);

const sourceFile = ts.factory.updateSourceFile(
  resultFile,
  ts.factory.createNodeArray([importFile, calssD])
);

// console.log(printer.printFile(sourceFile));
// console.log(sourceFile);
// sourceFile.forEachChild((child) => console.log(ts.SyntaxKind[child.kind]));
let importDecl;
sourceFile.forEachChild((child) => {
  if (ts.SyntaxKind[child.kind] === "ImportDeclaration") {
    importDecl = child;
  }
});
console.log(importDecl);
