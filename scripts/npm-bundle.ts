// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.30.0/mod.ts";

if (!Deno.args[0]) {
  throw new Error("missing version number");
}

console.log(Deno.args[0]);

await emptyDir("./npm");
Deno.copyFileSync("./.npmrc", "./npm/.npmrc");

await build({
  entryPoints: ["./lib/mod.ts", "./lib/get-jsx-factory.ts"],
  testPattern: "",
  outDir: "./npm",
  shims: {},
  package: {
    // package.json properties
    name: "get-jsx-factory",
    version: Deno.args[0],
    description: "Util for creating custom jsx factories.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/luke-john/get-jsx-factory.git",
    },
    bugs: {
      url: "https://github.com/luke-john/get-jsx-factory/issues",
    },
  },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
