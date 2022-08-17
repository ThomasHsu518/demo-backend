// imports

import { mine } from "@nomicfoundation/hardhat-network-helpers"
import { ethers } from "hardhat"

// async main
async function main() {
  const provider = ethers.provider
  let blockNumber = await provider.getBlockNumber()
  console.log(blockNumber)
  await mine(30)
  blockNumber = await provider.getBlockNumber()
  console.log(blockNumber)
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
