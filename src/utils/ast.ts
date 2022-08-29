import ts, { factory } from "typescript";

/* This function return import statement node */
export function genImport(
  importItems: string[],
  importFrom: string
): ts.ImportDeclaration {
  const node = factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports(resolveImportItem(importItems))
    ),
    factory.createStringLiteral(importFrom),
    undefined
  );

  return node;
}

/* This function will handle multiple import statement */
export function resolveImportItem(items: string[]): ts.ImportSpecifier[] {
  const nodeArray: ts.ImportSpecifier[] = [];
  items.forEach((item) => {
    const node = factory.createImportSpecifier(
      false,
      undefined,
      factory.createIdentifier(item)
    );
    nodeArray.push(node);
  });
  return nodeArray;
}

export function genClass(className: string): ts.ClassDeclaration {
  return factory.createClassDeclaration(
    [
      factory.createDecorator(
        factory.createCallExpression(
          factory.createIdentifier("Module"),
          undefined,
          [
            factory.createObjectLiteralExpression(
              [
                factory.createPropertyAssignment(
                  factory.createIdentifier("imports"),
                  factory.createArrayLiteralExpression(
                    [
                      factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                          factory.createIdentifier("MongooseModule"),
                          factory.createIdentifier("forFeature")
                        ),
                        undefined,
                        [
                          factory.createArrayLiteralExpression(
                            [
                              factory.createObjectLiteralExpression(
                                [
                                  factory.createPropertyAssignment(
                                    factory.createIdentifier("name"),
                                    factory.createPropertyAccessExpression(
                                      factory.createIdentifier(className),
                                      factory.createIdentifier("name")
                                    )
                                  ),
                                  factory.createPropertyAssignment(
                                    factory.createIdentifier("schema"),
                                    factory.createIdentifier(
                                      `${className}Schema`
                                    )
                                  ),
                                ],
                                false
                              ),
                            ],
                            false
                          ),
                        ]
                      ),
                    ],
                    true
                  )
                ),
                factory.createPropertyAssignment(
                  factory.createIdentifier("controllers"),
                  factory.createArrayLiteralExpression(
                    [factory.createIdentifier(`${className}Controller`)],
                    false
                  )
                ),
                factory.createPropertyAssignment(
                  factory.createIdentifier("providers"),
                  factory.createArrayLiteralExpression(
                    [
                      factory.createIdentifier(`${className}Service`),
                      factory.createIdentifier(`${className}Repository`),
                    ],
                    false
                  )
                ),
                factory.createPropertyAssignment(
                  factory.createIdentifier("exports"),
                  factory.createArrayLiteralExpression(
                    [factory.createIdentifier(`${className}Service`)],
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
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(`${className}Module`),
    undefined,
    undefined,
    []
  );
}
