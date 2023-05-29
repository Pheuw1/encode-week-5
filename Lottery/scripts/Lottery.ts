import { ethers } from "hardhat";
import * as readline from "readline";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Lottery, LotteryToken } from "../typechain-types";

let contract: Lottery;
let token: LotteryToken;

const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1;


async function initContracts() {
  const contractFactory = await ethers.getContractFactory("Lottery");
  contract = await contractFactory.deploy(
    "LotteryToken",
    "LT0",
    TOKEN_RATIO,
    ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    ethers.utils.parseEther(BET_FEE.toFixed(18))
  );
  console.log('Contract deployed to:', contract.address);
  await contract.deployed();
  const tokenAddress = await contract.paymentToken();
  const tokenFactory = await ethers.getContractFactory("LotteryToken");
  token = tokenFactory.attach(tokenAddress);
}

async function main() {
 await initContracts()
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
