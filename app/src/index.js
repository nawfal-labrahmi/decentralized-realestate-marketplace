import Web3 from "web3";

import solnSquareVerifierArtifact from "../../eth-contracts/build/contracts/SolnSquareVerifier.json";

const App = {
  web3: null,
  accounts: null,
  account: null,
  meta: null,
  proof: null,

  start: async function() {
    const { web3 } = this;

    this.proof = {
      "proof": {
        "a": [
          "0x203bb9021d8d7fcb057d7507deac6a353bd9d3a27a32044ecaa1149327b443a0",
          "0x17a2bd36d9b43500abdab81aecd54815c60b7567d5ed34addb489dac35958196"
        ],
        "b": [
          [
            "0x1c9e91cab272d8a1c94207877b10a835971c397b1b4cc0d64992a75cdabd269a",
            "0x208161c6244e6e67b28fdc2455724453dbb971d0f4f46b0427610273b922eb39"
          ],
          [
            "0x2c59ec30f6afba9fb4081db3b96e9bdcaef2b0ae3a3623a082002bc43bc81b3e",
            "0x0ec7a631282ad0f72cb922b4b472a7191f64a4e5f6e0e72c1ff5d430cd857c02"
          ]
        ],
        "c": [
          "0x048aaa95eaba84156a24c42bb8afe124d2dbc6faf27770b78c3a135455c4cccd",
          "0x243e34c0ceca0affaa7fb1fbcb20388515dcb411d4e1022790578f002a5a28b9"
        ]
      },
      "inputs": [
        "0x0000000000000000000000000000000000000000000000000000000000000009"
      ]
    };

    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = solnSquareVerifierArtifact.networks[networkId];
      
      this.meta = new web3.eth.Contract(
        solnSquareVerifierArtifact.abi,
        deployedNetwork.address,
      );

      this.accounts = await web3.eth.getAccounts();
      this.account = '0x49BF997b25e9C37Fd35D496ef9Cd0a31559E4f1a';
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }

    await web3.currentProvider.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          'eth_accounts': {
            requiredMethods: ['signTypedData_v4']
          }
        }
      ]
      })
      .then((permissions) => {
        const granted = permissions.find(
          (permission) => permission.parentCapability === 'eth_accounts'
        );
        if (granted) {
          console.log("granted");
        }
      })
      .catch((error) => {
        if (error.code === 4001) {
          console.log("Metamask account permissions not granted");
        }
      });
  },

  mint: async function() {
    const { mintNewNFT } = this.meta.methods;

    const tokenOwner = '0x7eaBeBE6eF06084a96C37E98d57bA4a5C297F9Fd';
    const id = 17;
    const a = this.proof.proof.a;
    const b = this.proof.proof.b;
    const c = this.proof.proof.c;
    const input = this.proof.inputs;

    await mintNewNFT(tokenOwner, id, a, b, c, input).send({from: this.account});

    App.setStatus("New ERC721 token minted for account: " + tokenOwner);
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});