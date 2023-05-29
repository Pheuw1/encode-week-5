import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: { tests: "test" },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/v7LEVBn7uDr-vK4is3YmkdLUDnoznTc1",
      accounts: ['3cf1e62c178bce7110cbfe115f5eb33e0495edae1e05553a2d4d39e3f2efc88d'],
    },
  },
};

export default config;
