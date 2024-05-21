// import { HardhatUserConfig, task } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
// import "@openzeppelin/hardhat-upgrades";
// import dotenv from "dotenv";
// dotenv.config();

// const config: HardhatUserConfig = {
//   solidity: "0.8.18",
//   networks: {
//     cvc: {
//       url: process.env.RPC_ENDPOINT!,
//       accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
//     },
//   },
// };

// task("balance", "Prints an account's balance")
//   .addOptionalParam("address", "The account's address")
//   .setAction(async ({ address }) => {
//     address = address ? address : process.env.DEPLOYER_PUBLIC_KEY!;
//     console.log(
//       // @ts-ignore
//       `Balance of ${address} is ${await ethers.provider.getBalance(address)}`
//     );
//   });

// export default config;
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import dotenv from "dotenv";
// import "@nomicfoundation/hardhat-verify";
// import { ethers } from "hardhat";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    xinfin: {
      url: process.env.XINFIN_NETWORK_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
    },
    apothem: {
      url: process.env.APOTHEM_NETWORK_URL!,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      chainId: 51,
    },
    holesky: {
      url: process.env.RPC_ENDPOINT,
      accounts: [String(process.env.PRIVATE_KEY)],
    },
  },
  etherscan: {
    apiKey: {
      holesky: "G28A3K7YMT6G74E3RNBQD3JYA6FEUV8674"
    },
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io",
        },
      },
    ],
  },
};

task("balance", "Prints an account's balance")
  .addOptionalParam("address", "The account's address")
  .setAction(async ({ address }) => {
    address = address ? address : process.env.DEPLOYER_PUBLIC_KEY!;
    console.log(
      // @ts-ignore
      `Balance of ${address} is ${await ethers.provider.getBalance(address)}`
    );
  });

export default config;
