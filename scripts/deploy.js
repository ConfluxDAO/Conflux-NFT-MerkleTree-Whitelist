const hre = require("hardhat");

async function main() {
  const signers = await hre.conflux.getSigners();
  const defaultAccount = signers[0];

  const MerkleTreeNFT = await hre.conflux.getContractFactory("MerkleTreeNFT");

  const root =
    "0x2823b48e7e4f60b6284176cbed733278ede812ca87f7918a0c543e20e2987eab";

  const receipt = await MerkleTreeNFT.constructor(
    "Confi MerkleTree",
    "Confi",
    root
  )
    .sendTransaction({
      from: defaultAccount.address,
    })
    .executed();

  console.log(
    `Contract deployment ${
      receipt.outcomeStatus === 0 ? "succeeded" : "failed"
    }`
  );

  console.log("MerkleTreeNFT deployed to:", receipt.contractCreated);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
