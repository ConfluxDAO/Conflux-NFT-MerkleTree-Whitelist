const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { format } = require("js-conflux-sdk");

// List of addresses
const whitelist = [
  "cfxtest:aamfjckr0t4egdymymjw475pz5jdng154y2vxgbjb0",
  "cfxtest:aaryn9u88jt23wehbwryrm52ntrfvscs6295jgtkpw",
];

// Helper function to encode the address as Solidity would
function solidityKeccak256(address) {
  // Convert Conflux address to hex format address (without "0x" prefix)
  const hexAddress = format.hexAddress(address).toLowerCase();
  // Encode the address and compute keccak256 hash
  return keccak256(Buffer.from(hexAddress.slice(2), "hex"));
}

// Convert addresses to hash (leaf nodes) using the helper function
const leaves = whitelist.map(solidityKeccak256);

// Create the Merkle tree
const tree = new MerkleTree(leaves, keccak256, {
  sortPairs: true,
});

// Get the Merkle tree root
const root = tree.getHexRoot();

// Get the proof for a specific address
const addressToProof = whitelist[0]; // Replace with the address you need the proof for
const leaf = solidityKeccak256(addressToProof);
const proof = tree.getProof(leaf).map((x) => x.data.toString("hex"));

// Display the complete Merkle tree
const layers = tree
  .getLayers()
  .map((layer) => layer.map((x) => x.toString("hex")));

console.log("Merkle tree layers:");
layers.forEach((layer, index) => {
  console.log(`Layer ${index}:`, layer);
});

console.log("merkle tree root:", root);
console.log("merkle tree proof for address", addressToProof, ":", proof);
