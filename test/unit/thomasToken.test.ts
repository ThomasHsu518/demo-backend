import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { assert, expect } from "chai"
import { developmentChains } from "../../helper-hardhat-config"
import { ThomasToken } from "../../typechain-types"

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("ThomasToken Uint Test", function () {
      // let someGlobalVariable
      let thomasToken: ThomasToken
      let deployer: string
      beforeEach(async function () {
        await deployments.fixture(["mocks", "thomasToken"])
        thomasToken = await ethers.getContract("ThomasToken")
        deployer = (await getNamedAccounts()).deployer
      })
      describe("constructor", () => {
        it("initialized", async function () {
          // Expected values
          const expectedBalanceOfContract = 1_000_000n * 10n ** 18n
          const expectedBalanceOfDeployer = 10_000n * 10n ** 18n
          const expectedSymbol = "TT"
          const expectedName = "ThomasToken"

          const totalSupply = await thomasToken.totalSupply()
          expect(totalSupply, "TotalSupply is equal to 1_010_000e18").to.equal(
            expectedBalanceOfContract + expectedBalanceOfDeployer
          )

          const balanceOfDeployer = await thomasToken.balanceOf(deployer)
          expect(balanceOfDeployer, "balanceOfDeployer is equal to 10_000e18").to.equal(
            expectedBalanceOfDeployer
          )

          const balanceOfContract = await thomasToken.balanceOf(thomasToken.address)
          expect(balanceOfContract, "balanceOfContract is equal to 1_000_000e18").to.equal(
            expectedBalanceOfContract
          )

          const tokenSymbol = await thomasToken.symbol()
          expect(tokenSymbol, `Token symbol is ${expectedSymbol}`).to.equal(expectedSymbol)

          const tokenName = await thomasToken.name()
          expect(tokenName, `Token name is ${expectedName}`).to.equal(expectedName)
        })
      })

      describe("faucet", () => {
        it("get token from faucet", async () => {
          // expected value
          const expectedAmount = await thomasToken.facentOnce()

          // previous value
          const previousTotalSupply = await thomasToken.totalSupply()
          const previousBalanceOfDeployer = await thomasToken.balanceOf(deployer)

          await thomasToken.faucet()

          const presentTotalSupply = await thomasToken.totalSupply()
          const presentBalanceOfDeployer = await thomasToken.balanceOf(deployer)

          expect(presentTotalSupply, "Total supply correct").to.equal(previousTotalSupply)
          expect(
            presentBalanceOfDeployer.sub(previousBalanceOfDeployer),
            "Balance of deployer correct"
          ).to.equal(expectedAmount)
        })
      })
    })
