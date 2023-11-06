import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  networks: {
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/"
    },
    linea_testnet: {
      url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY!}`,
      accounts: ["024b63cc384f8dd3bb738362d90fb7a123e168334bf8744e08e343325ab93480"],
    },
  }
};

export default config;
