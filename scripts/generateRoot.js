const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = ["0x...", "0x..."]; // List of addresses
const leaves = whitelist.map((addr) => keccak256(addr));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getRoot().toString("hex");

console.log(root);
