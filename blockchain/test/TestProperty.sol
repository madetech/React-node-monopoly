pragma solidity ^0.4.19;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Property.sol";

contract TestProperty {

  function testInitialiseDeployedPropertyContract() public {
    Property property = Property(DeployedAddresses.Property());

    bytes32 name = property.getName();
    Assert.equal(keccak256(name), keccak256(bytes32("PropertyName")), "Property token needs a name!");
  }
}
