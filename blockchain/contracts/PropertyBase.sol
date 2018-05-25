pragma solidity ^0.4.19;

import './Jail.sol';

contract PropertyBase is Jail {
  struct Property {
    bytes32 name;
    uint32 color;
    uint16 buy_price;
    uint16 rent_price;
    uint8 number_of_houses;
    uint8 number_of_hotels;
  }

  Property[] properties;

  mapping (uint256 => address) public propertyToOwner;
}
