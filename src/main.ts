import { isAbsolute, join, dirname } from "@std/path";
import { Command } from "@cliffy/command";
import { mdMerge } from "./lib/md-merge.ts";

const {
  args: [input, output],
} = await new Command()
  .name("md-merge")
  .version("0.1.0")
  .description("Merge markdown files")
  .arguments("<input:string> <output:string>")
  .parse(Deno.args);

type FilePathInfo = {
  dir: string;
  file: string;
};

// const inputFileInfo = getFilePathInfo(input);
const outputFileInfo = getFilePathInfo(output);

// const hooks = await getHooks(inputFileInfo);
// createOutputFile(inputFileInfo, outputFileInfo, hooks);

const outContent = await mdMerge(input);
await Deno.writeTextFile(outputFileInfo.file, outContent);

console.log("done");

function getFilePathInfo(filePath: string): FilePathInfo {
  let _filePath = filePath;

  if (!isAbsolute(filePath)) {
    _filePath = join(Deno.cwd(), filePath);
  }

  return {
    dir: dirname(_filePath),
    file: _filePath,
  };
}

// async function getHooks(input: FilePathInfo): Promise<Map<string, string>> {
//   const content = await Deno.readTextFile(input.file);

//   const regex = /<!-- md-merge (.*) -->/g;
//   const matches = content.matchAll(regex);

//   const cache = new Map<string, string>();

//   for (const match of matches) {
//     const hook = match[1].trim();
//     if (cache.has(hook)) {
//       continue;
//     }
//     const hookContent = await getHookContent(input.dir, hook);
//     cache.set(hook, hookContent);
//   }
//   return cache;
// }

// async function getHookContent(rootDirPath: string, hookPath: string) {
//   const p = isAbsolute(hookPath) ? hookPath : join(rootDirPath, hookPath);
//   let content = "";
//   try {
//     content = await Deno.readTextFile(p);
//   } catch (_) {
//     // ignore
//   }

//   return content;
// }

// async function createOutputFile(
//   input: FilePathInfo,
//   output: FilePathInfo,
//   hooks: Map<string, string>
// ) {
//   let content = await Deno.readTextFile(input.file);

//   for (const hook of hooks) {
//     content = content.replaceAll(`<!-- md-merge ${hook.at(0)} -->`, hook[1]);
//   }

//   await Deno.writeTextFile(output.file, content);
// }
