pragma solidity ^0.4.18;

contract Players {
  struct Player {
    uint16 balance;
  }

  mapping(address => Player) addressToPlayer;
  address[] players;

  function join () public payable costs(1){
    addressToPlayer[msg.sender] = Player(
      uint16(1500)
    );

    players.push(msg.sender);
  }

  function getPlayers () public view returns (address[]) {
    return players;
  }

  function getBalance (address address) public view returns (uint16) {
    player = addressToPlayer[address];
    if player return player.balance;
    return 0;
  }

  modifier costs(uint price) {
    require(msg.value == price);
    _;
  }
}
