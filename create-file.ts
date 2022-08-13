import * as fse from "fs-extra";

console.log(__dirname);

const srcDir = "./static";
const destDir = "./generated-code";

// copy dir
async function copyFiles() {
  try {
    await fse.copy(srcDir, destDir);
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}

copyFiles();
