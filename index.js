#!/usr/bin/env node
const argv = require('yargs')
    .option('s', {
        alias: 'separator',
        type: 'string',
        default: '_'
    })
    .option('l', {
        alias: 'lowercase',
        type: 'boolean',
        default: false
    })
    .argv

const sanitize = require('./sanitize')

let branchName = sanitize(argv._.join(' '), argv.separator)

if (argv.lowercase) {
    branchName = branchName.toLowerCase()
}

console.log(branchName)
