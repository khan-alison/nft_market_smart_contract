// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "../structs/Structs.sol";
import "./Events.sol";

abstract contract Upgradeable is
    ReentrancyGuard,
    UUPSUpgradeable,
    Ownable,
    Structs,
    Events
{
    mapping(address => uint256) nonces;
    mapping(bytes32 => Order) orderInfos;
    mapping(bytes32 => bool) activeOrders;
    bytes32[] public orders;

    mapping(address => bool) public defaultCollections;
    address recipient;
    uint256 fee;
    uint256 constant RATIO = 1000;

    // function initialize(address _owner) internal initializer {
    //     __ReentrancyGuard_init_unchained();
    //     __Ownable_init_unchained();
    //     // __Ownable_init(_owner);
    //     __UUPSUpgradeable_init_unchained(); 
    // }

    // Required by OZ
    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}

    function setDefaultCollection(
        address collection,
        bool isActive
    ) external onlyOwner {
        require(collection != address(0), "ZERO_ADDRESS");
        defaultCollections[collection] = isActive;
    }

    function getAllOrders() external view returns (bytes32[] memory) {
        return orders;
    }

    function setRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "ZERO_ADDRESS");
        emit RecipientChanged(recipient, newRecipient);

        recipient = newRecipient;
    }

    function setFee(uint256 newFee) external onlyOwner {
        fee = newFee;
    }

    // function setRatio(uint256 newRatio)
}
