pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/Player.sol";

contract TestPlayer {
  function testName() public {
    string memory name = "John";
    Player player = new Player(name);

    string memory expectedName = player.getName();
    Assert.equal(expectedName, name, "One is One.");
  }
}
