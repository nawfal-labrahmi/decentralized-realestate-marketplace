# Real Estate Marketplace

Ethereum Dapp powering a decentralized house listing service.
This project showcases how a blockchain approach could simplify property title management, making it more transparent and helping to reduce the risk of title fraud and the need for additional insurance.

This project allows you to mint your own tokens to represent your title to the properties. Before you mint a token, you need to verify you own the property. 
This makes use of the zk-SNARKs approach (via ZoKrates, a toolbox for zk-SNARKs on Ethereum) to create a verification system which can prove you have title to the property without revealing that specific information on the property.

Once the token has been verified you can list it on OpenSea for others to purchase.
OpenSea is a decentralized marketplace that is used for selling crypto assets such as CryptoKitties and other digital assets that are powered off Ethereum.

The capstone project was realized as part of the Udacity Blokchain Developer Nanodegree program.

# Instructions

* Install node dependencies: `npm install`
* Compile the Solidity smart contracts: `truffle compile`
* Deploy smart contract locally (local blockchain using Ganache) : `truffle migrate --reset`
* Run mocha tests (local blockchain using Ganache): `truffle test`
* Deploy smart contract on Rinkeby Testnet: `truffle migrate --reset --network rinkeby` (Cf. deployment configuration in `truffle-config.js`)
* Deploy smart contract on Goerli Testnet: `truffle migrate --reset --network goerli` (Cf. deployment configuration in `truffle-config.js`)
* Run Dapp frontend to interact with contract & mint NFTs: `npm run dev`

# Contract Deployment (Rinkeby Testnet)

* Deployment TxHash: `0x56fe281b9b1410b9ca21d8109a85c4de3bfa3fb87599a1fddecf4f861df03c6f`
* Contract address: `0x468232b6A31A5af9b04390c5ee7b9BB90904937a`
* Contract owner account: `0x49BF997b25e9C37Fd35D496ef9Cd0a31559E4f1a`
* Beneficiary account of the minted token: `0x7eaBeBE6eF06084a96C37E98d57bA4a5C297F9Fd`
* Token minting TxHash on etherscan: https://rinkeby.etherscan.io/tx/0x463c8b6db622c4a06eca1f08957c634864fad4fc7c46e08e8ea7c756ebaddde1
* OpenSea account of the NFT holder: https://testnets.opensea.io/0x7eaBeBE6eF06084a96C37E98d57bA4a5C297F9Fd

# UPDATED - Contract Deployment (Goerli Testnet)

Since the Ethereum merge, OpenSea does not support the Rinkeby testnet anymore, so the contracts/transactions have been deployed on Goerli as well.

* Deployement TxHash: `0xaae4a0b364b4c4ca395ce6ff5a60f473d7472ae0f5aed1f35e8410f07988f846`
* Verifier.sol Contract address: `0x25956f2ceC7dc71160Df0AF121657EcFF52cd387`
* SolnSquareVerifier.sol Contract address: `0x57C0ADDc3273cd3C15F87f443486E2A17268aa5E`
* Contract owner account: `0x49BF997b25e9C37Fd35D496ef9Cd0a31559E4f1a`
* Beneficiary account of the minted token: `0x7eaBeBE6eF06084a96C37E98d57bA4a5C297F9Fd`
* Token minting TxHash: https://goerli.etherscan.io/tx/0xbe05ab56e8941b4e1042c85bc6b19ea6f3a76a64d56691201aa1ccd984981ca0
* Minted token on OpenSea (on OpenSea Testnets): https://testnets.opensea.io/fr/assets/goerli/0x57c0addc3273cd3c15f87f443486e2a17268aa5e/17 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [OpenSea](https://docs.opensea.io/docs)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
