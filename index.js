/*global require process*/

'use strict';

const {spawn} = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('>> : ');

const out = (str) => process.stdout.write(str);

const run = function (args) {
    const child = spawn(args[0], args.slice(1));

    child.stdout.on('data', (data) => out('\n' + data));
    child.stderr.on('data', (data) => out(data + '\n'));
    child.on('error', (code) => out('error: ' + code + '\n'));
    child.on('close', () => rl.prompt(true));
};

out('>> ');

rl.on('line', (input) => {
    input = input ? input.trim() : '';
    if (input) {
        if (['exit', 'bye', 'quit'].indexOf(input) >= 0) {
            out('>> bye bye <<\n');
            rl.close();
            return;
        } else {
            run(input.split(/\s+/));
        }
    }
    rl.prompt(true)
});
