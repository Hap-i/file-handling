import ts from "typescript";

/* This function return import statement node */
export function addImport(
  importItems: string[],
  importFrom: string
): ts.ImportDeclaration {
  const node = ts.factory.createImportDeclaration(
    undefined,
    undefined,
    ts.factory.createImportClause(
      false,
      undefined,
      ts.factory.createNamedImports(resolveImportItem(importItems))
    ),
    ts.factory.createStringLiteral(importFrom),
    undefined
  );

  return node;
}

/* This function will handle multiple import statement */
export function resolveImportItem(items: string[]): ts.ImportSpecifier[] {
  const nodeArray: ts.ImportSpecifier[] = [];
  items.forEach((item) => {
    const node = ts.factory.createImportSpecifier(
      false,
      undefined,
      ts.factory.createIdentifier(item)
    );
    nodeArray.push(node);
  });
  return nodeArray;
}
