pragma solidity ^0.4.19;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PropertyAccessControl.sol";

contract TestPropertyAccessControl {

  function testInitialBankSet() public {
    PropertyAccessControl pac = PropertyAccessControl(DeployedAddresses.PropertyAccessControl());

    Assert.equal(pac.getBank(), 0x26006236EAB6409D9FDECB16ED841033D6B4A6BC, "Initial bank must be set");
  }
}
