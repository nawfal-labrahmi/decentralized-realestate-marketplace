var ERC721MintableComplete = artifacts.require('MyERC721Token');

contract('TestERC721Mintable', accounts => {

    const account1 = accounts[0];
    const account2 = accounts[1];
    const account3 = accounts[2];

    describe('Contract matches the ERC721 specifications', function () {
        
        beforeEach(async function () { 
            // Instantiate contract with account1 as owner
            this.contract = await ERC721MintableComplete.new({from: account1});
            let tokenId1 = 1;
            let tokenId2 = 2;
            
            // Mint multiple tokens
            await this.contract.mint(account2, tokenId1, 'uri1', {from: account1});
            await this.contract.mint(account3, tokenId2, 'uri2', {from: account1});
        })

        it('should return total supply', async function() {
            var totalSupply = await this.contract.totalSupply();

            assert.equal(totalSupply, 2);
        })

        it('should get token balance', async function() { 
            var balance = await this.contract.balanceOf(accounts[1]);

            assert.equal(balance, 1);
        })

        it('should return token uri', async function() { 
            let tokenId1 = 1;
            let tokenURI = await this.contract.tokenURI(tokenId1); 
            let baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

            assert.equal(tokenURI, baseTokenURI + tokenId1);
        })

        it('should transfer token from one owner to another', async function() {
            let tokenId = 1;
            let originalOwnerOfTokenId1 = await this.contract.ownerOf(tokenId);
            
            await this.contract.transferFrom(originalOwnerOfTokenId1, account3, tokenId, {from: originalOwnerOfTokenId1});
        
            let newOwnerOfTokenId1 = await this.contract.ownerOf(tokenId);
            
            assert.equal(newOwnerOfTokenId1, account3, "new owner is not correct");
        })
    });

    describe('Contract has ownership properties', function () {
        
        beforeEach(async function() { 
            this.contract = await ERC721MintableComplete.new({from: account1});
        })

        it('should fail when minting when address is not contract owner', async function() { 
            let exceptionReason;
            let nonContractOwnerAccount = account2;
            
            try {
                await this.contract.mint(account3, 10, "baseTokenURI", {from: nonContractOwnerAccount});
            } catch(exception) {
                exceptionReason = exception.reason;
            }
            
            assert.equal(exceptionReason, "Caller should be the contract owner");
        })

        it('should return contract owner', async function() { 
            var contractOwner  = await this.contract.owner(); 
            
            assert.equal(contractOwner, account1);
        })

    });
})