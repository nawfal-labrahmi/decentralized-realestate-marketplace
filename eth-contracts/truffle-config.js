 const HDWalletProvider = require('@truffle/hdwallet-provider');
 const infuraKey = "eefb8ec8abeb4fe0b26ac31850c468b8";
 const fs = require('fs');
 const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {

  networks: {
    
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

    // Deprecated since the Ethereum merge - not supported by OpenSea Testnet anymore
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,
      from: "0x49BF997b25e9C37Fd35D496ef9Cd0a31559E4f1a",
      gas: 4500000,
      gasPrice: 10000000000
    },

    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraKey}`),
      network_id: 5,
      from: "0x49BF997b25e9C37Fd35D496ef9Cd0a31559E4f1a",
      gas: 4500000,
      gasPrice: 10000000000
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.12",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      evmVersion: "constantinople"
      // }
    }
  }
}
