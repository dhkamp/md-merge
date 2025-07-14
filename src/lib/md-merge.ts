import { isAbsolute } from "@std/path/is-absolute";
import { getImports } from "./md_importer/md_importer.ts";
import { join } from "@std/path/join";

export async function mdMerge(path: string): Promise<string> {
  const absPath = isAbsolute(path) ? path : join(Deno.cwd(), path);

  const content = await Deno.readTextFile(absPath);
  const imports = await getImports(absPath, content);
  let outcontent = content;

  for (const [key, value] of imports) {
    outcontent = outcontent.replace(`<!-- md-merge ${key} -->`, value);
  }

  return outcontent;
}
