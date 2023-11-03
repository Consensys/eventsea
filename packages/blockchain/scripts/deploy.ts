import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const factory = await ethers.deployContract("EventsFactory");
  try {
    await factory.waitForDeployment();
    console.log("EventsFactory deployed", factory);
  } catch (e) {
    console.log("EventsFactory failed", e);
  }

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
