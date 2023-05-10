import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import './tasks';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    owner: 0,
    user: 1,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      allowUnlimitedContractSize: true,
    },
    optimism: {
      url: process.env.RPC_URI,
      ...(process.env.KEY ? { accounts: [process.env.KEY] } : {}),
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  },
};

export default config;
