// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./MerkleTreeProof.sol";

contract MerkleTreeNFT is ERC721 {
    bytes32 public immutable merkleRoot;
    mapping(address => bool) public hasMinted;

    constructor(
        string memory name,
        string memory symbol,
        bytes32 root
    ) ERC721(name, symbol) {
        merkleRoot = root;
    }

    function mint(
        address account,
        uint256 tokenId,
        bytes32[] calldata proof
    ) external {
        require(_verify(_leaf(account), proof), "Invalid merkle proof");
        require(!hasMinted[account], "Already minted!");
        _mint(account, tokenId);
        hasMinted[account] = true;
    }

    function _leaf(address account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(account));
    }

    function _verify(
        bytes32 leaf,
        bytes32[] memory proof
    ) internal view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }
}
