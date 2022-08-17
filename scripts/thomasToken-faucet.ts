// imports

import { ethers, getNamedAccounts } from "hardhat"
import { ThomasToken } from "../typechain-types"

// async main
async function main() {
  const player = (await getNamedAccounts()).player
  const thomasToken: ThomasToken = await ethers.getContract("ThomasToken", player)
  await thomasToken.faucet()
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
