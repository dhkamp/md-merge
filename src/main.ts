import { Command } from "@cliffy/command";
import { mdMerge } from "./lib/md-merge.ts";
import { basename, extname, isAbsolute, join, dirname } from "@std/path";

const {
  args: [input],
  options: { outname, outdir },
} = await new Command()
  .name("md-merge")
  .version("0.1.0")
  .description("Merge markdown files")
  .arguments("<input:string>")
  // .option(
  //   "-o, --output <output:string>",
  //   "Output file path. If not provided, the output directory will be the same as the input file directory."
  // )
  .option("-n, --outname <string>", "Output file name.")
  .option("-d, --outdir <string>", "Output directory.")
  .parse(Deno.args);

const inputPath = isAbsolute(input) ? input : join(Deno.cwd(), input);
console.log("inputPath", inputPath);

const outputFileName = outname
  ? outname
  : basename(input).replace(extname(input), "-merged.md");
console.log("outputFileName", outputFileName);

const outputDirectory = outdir ? outdir : dirname(inputPath);
console.log("outputDirectory", outputDirectory);
// await mdMerge(input);

console.log("done");
