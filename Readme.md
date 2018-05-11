# Monopoly on the Ethereum blockchain

This project aims to create a [Monopoly](https://en.wikipedia.org/wiki/Monopoly_(game)) version of a game running as a decentralized application on top of the Ethereum blockchain. It's done as a part of our Learn Tech Fridays where we spend our afternoon hours learning new tech.

UI in React is a fork of [ChebyrTech/React-node-monopoly](https://github.com/ChebyrTech/React-node-monopoly).

Our current tasks are:

1. Write smart contracts encapsulating Monopoly rules.
2. Replace layer of Redux business logic from original code with calls to our smart contracts.

## Installation

Install truffle framework globally in your system:

```
npm install -g truffle
```

See [Truffle Quickstart](http://truffleframework.com/docs/getting_started/project) documentation for commands.

To install all dependencies for smart contracts run:

```
cd blockchain/
npm install
```

React UI is a standalone project and doesn’t require any additional steps. Open `index.html` from the root directory in your favorite browser and it will work right away.

## Development

For development we use:

* [Ethereum](https://www.ethereum.org/) as a blockchain
* [Solidity](https://solidity.readthedocs.io/en/v0.4.23/) as a language for smart contracts
* [Truffle](http://truffleframework.com/) as a framework
* [OpenZeppelin](https://openzeppelin.org/) as a standard library
* [web3.js](https://github.com/ethereum/web3.js/) as a client
* [ganache-cli](https://github.com/trufflesuite/ganache-cli) as a local chain

## Testing

To create a local chain on development machines we use [ganache-cli](https://github.com/trufflesuite/ganache-cli). We found it to be more stable than [GUI version](https://github.com/trufflesuite/ganache) of Ganache which often has problems on macOS.

Start your local chain:

```
ganache-cli -m 'test'
```

Using the same mnemonic every time (`-m` option, normally it's composed of 24 words) will ensure the same state of test chain every time tests are run. First wallet is also hardcoded as an initial bank account for now.

To run tests execute:

```
cd blockchain/
truffle test
```
