import ts from "typescript";
import { genModule, genModuleCode } from "../src/resource/module/module.gen";
import { genClass, genImport } from "../src/utils/ast";

const importsArray = [
  {
    importItems: ["Module"],
    importFrom: "@nestjs/common",
  },
  {
    importItems: ["MongooseModule"],
    importFrom: "@nestjs/mongoose",
  },
];
const classObj = {
  name: "Account",
};
genModule(importsArray, classObj);
// console.log(code);
