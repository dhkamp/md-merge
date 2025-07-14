import { isAbsolute, join, dirname } from "@std/path";

type FileInfo = {
  dir: string;
  realPath: string;
  content: string;
};

export async function getFileInfo(path: string): Promise<FileInfo> {
  const absolutePath = isAbsolute(path) ? path : join(Deno.cwd(), path);

  const realPath = await Deno.realPath(absolutePath);
  const dir = await dirname(absolutePath);
  const content = await Deno.readTextFile(absolutePath);

  return {
    dir,
    realPath,
    content,
  };
}
