# md-merge

This little tool aims at merging markdown files with ease.
The merge is signaled to the program by a comment in the markdown file in the following format

- [md-merge](#md-merge)
  - [Arguments](#arguments)
  - [Options](#options)
  - [Examples](#examples)


## Arguments

- **`<input>`**: First argument to be entered. This needs to be the path to your root-markdown file, meaning the file that will be used as a base for the merge.
- **`<output>`**: Second argument to be entered. This needs to be the path to the file that will be created after the merge.

## Options
None yet.

## Examples

**root.md**
```md
# This is my root file
This is my root files content
And the following comment singals to md-merge to include the whole content from partial.md at this location.

<!-- md-merge partial.md -->
```

**partial.md**
```md
# This is my partial file
This is my partial files content.
```

Running the following command will merge all the content from `partial.md` into `root.md` at the location of the comment and create a new file called output.md.

```bash
md-merge root.md output.md
```

When the command is done, the output.md looks like this:

**output.md** 
```md
# This is my root file
This is my root files content
And the following comment singals to md-merge to include the whole content from partial.md at this location.

# This is my partial file
This is my partial files content.
```