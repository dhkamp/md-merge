import { join, dirname, isAbsolute } from "jsr:@std/path";

// This regex is used to identify all imports in a markdown file pointing to other files
// whose contents should be imported
const IMPORT_PLACEHOLDER_REGEX = /<!-- md-merge (.*) -->/g;

// asd
const MD_LINK_RELATIVE_PATH = /\[(.*?)\]\((?!https?:\/\/|\/)([^)]+?)\)/g;

export async function getImports(absPath: string, content: string) {
  const dir = dirname(absPath);
  const matches = content.matchAll(IMPORT_PLACEHOLDER_REGEX);
  const cache = new Map<string, string>();

  for (const match of matches) {
    const importPath = match[1].trim();
    if (cache.has(importPath)) {
      continue;
    }
    const importContent = await getImportContent(dir, importPath);
    cache.set(importPath, importContent);
  }
  return cache;
}

export async function getImportContent(
  rootFileDir: string,
  importFilePath: string
) {
  const importPath = isAbsolute(importFilePath)
    ? importFilePath
    : join(rootFileDir, importFilePath);
  let content = "";
  try {
    content = await Deno.readTextFile(importPath);
    content = updateRelativeLinks(dirname(importFilePath), content);
  } catch (_) {
    // ignore
  }

  return content;
}

function updateRelativeLinks(fileDir: string, content: string) {
  const matches = content.matchAll(MD_LINK_RELATIVE_PATH);
  let newContent = content;

  for (const match of matches) {
    newContent = newContent.replaceAll(match[2], join(fileDir, match[2]));
  }
  return newContent;
}
