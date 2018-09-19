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


let accounts;
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
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(accounts)

  })
})

//Mocha tests

// class Car {
//   park() {
//     return 'stopped'
//   }
//   drive() {
//     return 'vroom'
//   }
// }
//
//
// let car;
//
// beforeEach(() => {
//   car = new Car()
// })
// //describe test
// describe('Car', () => {
//   //first test
//   it('park should return a string, "stopped"', () => {
//     //functionality testing
//     // const car = new Car()
//     //assert.equal checks to make sure both args are equal
//     assert.equal(car.park(), 'stopped')
//   })
//   it('drive should return a string "vroom"', () => {
//     // const car = new Car()
//     assert.equal(car.drive(), 'vroom')
//   })
// })
