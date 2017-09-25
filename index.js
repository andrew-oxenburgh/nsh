var {spawn} = require('child_process');
var readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function out(str) {
    process.stdout.write(str);
}

const run = (cmd) => {

    if (!cmd.trim()) {
        return;
    }

    args = cmd.split(' ');

    let child;
    if (args.length == 1) {
        child = spawn(args[0]);
    } else if (args.length > 1) {
        child = spawn(args[0], args.slice(1));
    }
    let err = '';
    child.stdout.on('data', function (data) {
        out(data + '\n');
    });
    child.stderr.on('data', function (data) {
        err = data;
    });
    child.on('close', function (code) {
        if (code !== 0) {
            out('error: ' + err + '\n')
        }
    });
    child.on('error', function (code) {
        err = code.errno;
    });
};

out('>> ');

rl.on('line', (input) => {
    input = input ? input.trim() : '';
    if (input.length >= 0) {
        if (input === 'exit' || input === 'bye' || input === 'quit') {
            console.log('bye');
            rl.close();
            return;
        }
        run(input);
    } else {

    }
    out('>> ');
});
