pragma solidity ^0.5.5;

import "./ERC721Mintable.sol";
import "./verifier.sol";

contract SolnSquareVerifier is MyERC721Token {

    Verifier verifier;

    // solutions struct that can hold an index & an address
    struct solution {
        uint256 id;
        address account;
    }

    mapping(bytes32 => solution) private solutions; // mapping to store unique solutions submitted
    
    event SolutionAdded(uint256 id, address account); // event to emit when a solution is added
    
    constructor(address verifierContractAddress) public {
        verifier = Verifier(verifierContractAddress);
    }

    /**
     * @dev Adds a solution to the array and emit the event
     */
    function addSolution(
        address account, 
        uint256 id,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input) public {

            bytes32 solutionHash = _generateSolutionHash(a, b, c, input);
            _addSolution(account, id, solutionHash);
    }

    /**
     * @dev function to mint new NFT only after the solution has been verified
     * It then ensures the provided solution is unique (has not been used before),
     * and handles metadata as well as tokenSupply
     */
    function mintNewNFT(
        address account, 
        uint256 id, 
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c, 
        uint[1] memory input) public returns (bool) {
            
            require(verifier.verifyTx(a, b, c, input), "zksnarks proof could not be verified");
            bytes32 solutionHash = _generateSolutionHash(a, b, c, input);
            
            require(solutions[solutionHash].account == address(0), "This solution has already been used");
            _addSolution(account, id, solutionHash);
            return mint(account, id, "url");
    }

    function _generateSolutionHash(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c, 
        uint[1] memory input) private pure returns(bytes32) {
            return keccak256(abi.encodePacked(a, b, c, input));
    }

    function _addSolution(address account, uint256 id, bytes32 solutionHash) private {
        solutions[solutionHash] = solution({
                                    id: id,
                                    account: account
                                });
        emit SolutionAdded(id, account);
    }
}

  


























