/*global require process*/


'use strict';

const {spawn} = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const out = (str) => process.stdout.write(str);

const spawnChild = function (args) {
    let err = '';
    const child = spawn(args[0], args.slice(1));

    child.stdout.on('data', (data) => out(data + '\n'));
    child.stderr.on('data', (data) => err = data);
    child.on('error', (code) => err = code.errno);

    child.on('close', (code) => {
        if (code !== 0) {
            out('error: ' + err + '\n');
        }
    });
};

const run = (cmd) => cmd.trim() ? spawnChild(cmd.trim().split(/\s+/)) : undefined;

out('>> ');

rl.on('line', (input) => {
    input = input ? input.trim() : '';
    if (input.length >= 0) {
        if (['exit', 'bye', 'quit'].indexOf(input) >= 0) {
            out('>> bye bye <<\n');
            rl.close();
            return;
        }
        run(input);
        out('herere');
    }
    out('>> ');
});
