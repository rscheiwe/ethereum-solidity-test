const assert = require('assert');
//ganache automatically creates and sets accounts to send transactions to
const ganache = require('ganache-cli');
//constructor function, used to created INSTANCES of web3 library
//whenever working with a constructor, capitalize
const Web3 = require('web3');
//instance of above class, Web3
//const web3
//tells the instance to connect to the local ganache network
//the first arg (ganache.provider()) will change over time
//depending on the network we're trying to connect to
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile.js')


let accounts;
let inbox;
// const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
  // Get a list of all accounts
  //web3 module has many cryptocurrencies associated with it
  //EVERY FUNCTION we call with web3 is asynchronous, so they
  //return a promise
  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts)
  //   })
  accounts = await web3.eth.getAccounts()
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    })
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    //if the contract has an address, it can be safely assumed
    //that it has been successfully deployed
    //'ok' asks: is this (this.options.address) a defined value
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    //reference instance of the contract, which has a property called
    // methods, an object that contains all the public methods
    // available to it (tied to the contract)
    //Could be .setMessage().call(), but that would require an
    // argument, which .message() does not
    //.call() customizes how the function is called
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi there!')
  })

  it('can change the message', async () => {
    //first line: set a new message and send it out to the network,
    //being sure to specify where/who it's coming from (e.g.,
    // who's paying the gas)
    await inbox.methods.setMessage('bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'bye')
  })
})
