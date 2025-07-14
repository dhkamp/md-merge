# md-merge

The md-merge tool helps you combine multiple markdown files into one. Just add a comment like <!-- md-merge PATH_TO_FILE.md --> in your main markdown file to include content from other files. 

- [md-merge](#md-merge)
  - [Examples](#examples)
    - [Simple merge](#simple-merge)
    - [Merge with custom output name](#merge-with-custom-output-name)
    - [Merge with custom output directory](#merge-with-custom-output-directory)
    - [Merge with custom output type](#merge-with-custom-output-type)
  - [Arguments](#arguments)
  - [Options](#options)
  - [Examples](#examples-1)

## Examples


### Simple merge
**root.md**
```md
# This is my root file
This is my root files content

Below this line we will include the content from partial.md
<!-- md-merge partial.md -->
```

**partial.md**
```md
## Partial Content
This content will be imported into root.md
```

```bash
md-merge root.md
```

This command will create a file called `root-merged.md` in the same directory as `root.md` with the following content

**root-merged.md**
```md
# This is my root file
This is my root files content

Below this line we will include the content from partial.md
## Partial Content
This content will be imported into root.md
```

### Merge with custom output name

```bash
md-merge root.md -n my-merged-file.md
```

### Merge with custom output directory
```bash
md-merge root.md -d ./my-output-directory
```

### Merge with custom output type
Converts the output file to the specified type. Supported types are `pdf`, `html` and `md`.
```bash
md-merge root.md -t pdf
```

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