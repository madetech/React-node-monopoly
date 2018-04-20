pragma solidity ^0.4.18;

contract Players {
  struct Player {
    string name;
  }

  mapping(address => Player) addressToPlayer;

  function join (string name) public {
    addressToPlayer[msg.sender] = Player(
      name
    );
  }
  function get () public view returns (string playerName) {
    return addressToPlayer[msg.sender].name;
  }
}
