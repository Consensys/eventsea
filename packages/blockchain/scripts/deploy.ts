import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.deployContract("EventsFactory");
  try {
    await factory.waitForDeployment();
    const networkName = (await ethers.provider.getNetwork()).name;
    console.log(
      `🚀 The EventsFactory contract has been successfully deployed to the ${networkName} network. Contract address: ${factory.target}`
    );
    console.log(
      "Please update the 'NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS' environment variable in the 'web' workspace file with above address."
    );
  } catch (e) {
    console.log("EventsFactory failed", e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
