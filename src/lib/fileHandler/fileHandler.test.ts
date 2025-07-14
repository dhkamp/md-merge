import { getFileInfo } from "./fileHandler.ts";
import { assertEquals } from "@std/assert";
import { join } from "@std/path";

Deno.test("getFileInfo", async () => {
  const filePath = join(Deno.cwd(), "src/lib/fileHandler/test.txt");

  const fileInfo = await getFileInfo("src/lib/fileHandler/test.txt");
  assertEquals(fileInfo, {
    content: "Lorem Ipsum",
    dir: join(Deno.cwd(), "src/lib/fileHandler"),
    realPath: filePath,
  });
});
