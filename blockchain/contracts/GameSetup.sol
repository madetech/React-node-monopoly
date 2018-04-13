pragma solidity ^0.4.19;

import './PropertyOwnership.sol';

contract GameSetup is PropertyOwnership {
  function setup() public onlyBank {
    _createProperty(
      'Mayfair',
      0x0000,
      200,
      50,
      0,
      0
    );
  }

  function getProperty(uint256 index) external returns(address) {
    return propertyToOwner[index];
  }
}
