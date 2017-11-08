const parseArgs = require('minimist');

const argv = parseArgs(process.argv.slice(2), {
    alias: { 'help': 'h' },
});

if (argv.help) {
    printHelpMessage();
}

const availableArgs = {
    help,
    action,
    file
}



function inputOutput(filePath) { /* ... */};
function transformFile(filePath) { /* ... */};
function transform() { /* ... */};
function httpClient() { /* ... */};
function httpServer() { /* ... */};

function printHelpMessage() {
    console.log('This is a help message');
};
