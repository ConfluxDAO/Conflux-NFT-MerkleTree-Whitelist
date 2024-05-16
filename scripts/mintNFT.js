const hre = require("hardhat");

async function main() {
  const signers = await hre.conflux.getSigners();
  const defaultAccount = signers[0];

  const contractAddress = "cfxtest:accybmp0yf7j85nb68g2jcxm7frckmuvwe4zrj0v73";
  const recipientAddress = "cfxtest:aamfjckr0t4egdymymjw475pz5jdng154y2vxgbjb0"; // Address to receive the NFT
  const tokenId = 1;

  const MerkleTreeNFT = await hre.conflux.getContractAt(
    "MerkleTreeNFT",
    contractAddress
  );

  const proof = [
    "0x1007ff1353d00afa8cab69db454edb27a5d3701206f8a561f7cf61987ed53a52",
  ];

  const receipt = await MerkleTreeNFT.mint(recipientAddress, tokenId, proof)
    .sendTransaction({
      from: defaultAccount.address,
    })
    .executed();

  console.log(
    `Minted NFT to ${recipientAddress}: Transaction Hash: ${receipt.transactionHash}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
