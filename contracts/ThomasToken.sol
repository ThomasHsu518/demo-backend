// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity ^0.8.0;

// 2. Imports
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

// 3. Error Code
// error FundMe__NotOwner();

// 4. Interfaces

// 5. Libraries

// 6. Contracts

/**@title Solidity Contract
 * @author ThomasHsu
 * @notice This contract is for creating a xxx contract
 * @dev This implements price feeds as our library
 */
contract ThomasToken is ERC20 {
  // Type Declarations
  // using PriceConverter for uint256;
  // State variables
  uint256 constant FAUCET_ONCE = 1_000e18;
  uint256 constant FAUCET_TOTAL = 1_000_000e18;
  uint256 constant INITIAL_DEPLOYER = 10_000e18;

  // Events
  // Modifiers
  // Functions Order:
  //-// constructor
  constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
    _mint(msg.sender, INITIAL_DEPLOYER);
    _mint(address(this), FAUCET_TOTAL);
  }

  //-// receive
  //-// fallback

  //-// external
  function faucet() external {
    _transfer(address(this), msg.sender, FAUCET_ONCE);
  }

  //-// public
  //-// internal
  //-// private
  //-// view / pure
  function facentOnce() public pure returns (uint256) {
    return FAUCET_ONCE;
  }

  function facentTotal() public pure returns (uint256) {
    return FAUCET_TOTAL;
  }

  function initialDeployer() public pure returns (uint256) {
    return INITIAL_DEPLOYER;
  }

  /** @notice Gets the amount that an address has funded
   *  @param fundingAddress the address of the funder
   *  @return the amount funded
   */
}
