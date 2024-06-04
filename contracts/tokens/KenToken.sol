// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../libs/ERC165Checker.sol";

contract KenToken is ERC20, Ownable {
    constructor() ERC20("KenToken", "KTK") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function isERC20Compatible() public pure returns (bool) {
        return true;
    }
}

// NFTMarketplace was deployed at 0x77ab0ad16Cb8b17198eb872E983966B68Ba01F67
// Deploying KenToken...
// KenToken was deployed at 0x00d3aE8EaA0E44b200456476Fd29913E61A159Aa