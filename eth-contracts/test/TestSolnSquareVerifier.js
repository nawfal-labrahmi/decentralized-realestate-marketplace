const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');

const truffleAssert = require('truffle-assertions');

contract('Verifier', accounts => {

    const owner = accounts[0];
    const account2 = accounts[1];
    const proof = {
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
    }
    
    describe('Solution square verifier requirements', function () {
        
        beforeEach(async function () { 
            let verifierContract = await Verifier.new({from: owner});
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: owner});
        })

        it('should add a new solution for the contract', async function () {
            let id = 13;
            let tx = await this.contract.addSolution(
                account2,
                id,
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                {from: owner}
              );
              
            truffleAssert.eventEmitted(tx, "SolutionAdded", (event) => {
                return event.id == id && event.account == account2
            });
        })

        it('should mint new ERC721 token for the contract', async function () {
            let id = 13;
            let result = await this.contract.mintNewNFT.call(
                account2,
                id,
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                {from: owner}
              );
              
              assert.equal(result, true);
        })
    });
})
