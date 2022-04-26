import { build, emptyDir } from "https://deno.land/x/dnt@0.21.2/mod.ts";
import * as semver from "https://deno.land/x/semver@v1.4.0/mod.ts";

const version = semver.clean(Deno.args[0]);
if (!semver.valid(version)) {
  throw new Error("Wrong version number: " + version);
}

await emptyDir("./npm");

await build({
  typeCheck: true,
  test: false,
  declaration: true,
  scriptModule: false,
  shims: {
    deno: false,
  },
  entryPoints: ["./src/lite-sdk.ts"],
  outDir: "./npm",
  package: {
    name: "directus-lite-sdk",
    version: version as string,
    description: "Alternative <1Kb Directus SDK (TypeScript)",
    main: "esm/directus-lite-sdk.js",
    license: "MIT",
    author: "Jacobo Tabernero Rey - https://jacobo.codes",
    homepage: "https://github.com/jacoborus/directus-lite-sdk",
    keywords: [
      "directus",
      "sdk",
      "lite",
      "typescript",
    ],
    repository: {
      "type": "git",
      "url": "git@github.com:jacoborus/directus-lite-sdk.git",
    },
    bugs: {
      "url": "https://github.com/jacoborus/directus-lite-sdk/issues",
    },
  },
});

await Deno.mkdir("./npm", { recursive: true });
Deno.copyFileSync("LICENSE", "./npm/LICENSE");
Deno.copyFileSync("README.md", "./npm/README.md");
