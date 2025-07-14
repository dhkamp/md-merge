import { Command } from "@cliffy/command";
import { mdMerge } from "./lib/md-merge.ts";

const {
  args: [input],
  // options: { output },
} = await new Command()
  .name("md-merge")
  .version("0.1.0")
  .description("Merge markdown files")
  .arguments("<input:string> <output:string>")
  // .option(
  //   "-o, --output <output:string>",
  //   "Output file path. If not provided, the output directory will be the same as the input file directory."
  // )
  .parse(Deno.args);

await mdMerge(input);

console.log("done");
