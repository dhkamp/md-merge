import { isAbsolute } from "@std/path/is-absolute";
import { getImports } from "./md_importer/md_importer.ts";
import { join } from "@std/path/join";
import { dirname } from "@std/path/dirname";

export async function mdMerge(inputPath: string) {
  const absPath = isAbsolute(inputPath)
    ? inputPath
    : join(Deno.cwd(), inputPath);

  const content = await Deno.readTextFile(absPath);
  const imports = await getImports(absPath, content);
  let outcontent = content;

  for (const [key, value] of imports) {
    outcontent = outcontent.replace(`<!-- md-merge ${key} -->`, value);
  }

  await Deno.writeTextFile(join(dirname(absPath), "output.md"), outcontent);
}
