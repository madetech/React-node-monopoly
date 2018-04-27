pragma solidity ^0.4.18;

contract Players {
  struct Player {
    string name;
    uint16 balance;
  }

  mapping(address => Player) addressToPlayer;

  function join (string name) public payable costs(1){
    addressToPlayer[msg.sender] = Player(
      name,
      uint16(1500)
    );
  }

  function getCurrentPlayer () public view returns (string, uint16) {
    Player memory player = addressToPlayer[msg.sender];
    return(player.name, player.balance);
  }

  modifier costs(uint price) {
    require(msg.value == price);
    _;
  }
}
