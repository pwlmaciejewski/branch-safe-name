# branch-safe-name

Git branch names sanitizer

## Installation

```bash
yarn global add branch-safe-name
```

## Basic usage

```bash
$ branch-safe-name -l -s '-' Some long string that you copy-pasted from a browser
some-long-string-that-you-copy-pasted-from-a-browser
```

## Git alias usage

Create an alias in your `.gitconfig`

```
[alias]
    brnew = !"f() { branch-safe-name -l -s '-' $@ | xargs git checkout -b; }; f"
```

Use it to create new branches

```
git brnew Fix for the bug #1234
```

It will create a new `fix-for-the-bug` branch for you :sunglasses:
