//builds a director path to the current .js file over to
//the inbox.sol file as well
//guaranteed to get cross-platform compatability
const path = require('path');
const fs = require('fs');
const solc = require('solc')
//dirname is defined by node and it always gets set to the
//current working directory
//it'll take us from the home directory on our computer
//all the way to the inbox root folder
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//call the solidity compiler, pass in source, and specify
//the number of contracts we're trying to compile

//the return value from .compile is always an object
//the solidity compiler is built assuming you might want
//to compile multiple contracts in one go
//interface is the contract's ABI; lists out all the different
//functions that can be called on the contract

// module.exports = solc.compile(source, 1);

//destructure off the first nested key (:Inbox) and its values,
//which contains the Bytecode, ABI, etc
module.exports = solc.compile(source, 1).contracts[':Inbox'];
