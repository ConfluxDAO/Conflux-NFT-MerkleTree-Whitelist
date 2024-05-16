// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library MerkleProof {
    /**
     * @dev Returns `true` when a `root` reconstructed from a `proof` and `leaf` equals the given `root`, indicating valid data.
     * In the reconstruction, leaf pairs and element pairs are sorted.
     */
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        return processProof(proof, leaf) == root;
    }

    /**
     * @dev Returns the `root` computed from a Merkle tree using `leaf` and `proof`. The `proof` is only valid if the reconstructed `root` matches the given `root`.
     * In the reconstruction, leaf pairs and element pairs are sorted.
     */
    function processProof(
        bytes32[] memory proof,
        bytes32 leaf
    ) internal pure returns (bytes32) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = _hashPair(computedHash, proof[i]);
        }
        return computedHash;
    }

    // Sorted Pair Hash
    function _hashPair(bytes32 a, bytes32 b) private pure returns (bytes32) {
        return
            a < b
                ? keccak256(abi.encodePacked(a, b))
                : keccak256(abi.encodePacked(b, a));
    }
}
