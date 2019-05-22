const FORBIDDEN_SEPARATOR_CHARS = [' ', '..', '~', '^', ':', '?', '*', '[', '@']

function sanitize (input, separator = '_') {
    FORBIDDEN_SEPARATOR_CHARS.forEach((forbiddenChar) => {
        if (separator.indexOf(forbiddenChar) !== -1) {
            throw new Error(`Invalid separator char: ${forbiddenChar}`)
        }
    })

    let output = input

    output = output.replace(/\/\s+/g, '/')

    const toRemove = [
        /~/g,
        /\^/g,
        /:/g,
        /\\/g,
        /\.\.$/,
        /(@\{)+/g,
        /\?/g,
        /\*/g,
        /\[/g
    ]
    output = toRemove.reduce((output, regexp) => {
        return output.replace(regexp, '')
    }, output)

    const toSeparate = [
        /(\.\.)+/g,
        /\s+/g
    ]
    output = toSeparate.reduce((output, regexp) => {
        return output.replace(regexp, separator)
    }, output)

    output = output.replace(/\/\./g, '/')
        .replace(/(\/[^/]+)\.lock/g, `$1${separator}lock`)
        .replace(/\/+/g, '/')

    return output
}

module.exports = sanitize
