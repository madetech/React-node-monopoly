pragma solidity ^0.4.18;

contract Players {
  function join (string name) public pure { }
  function get () public view returns (address whoCalledThis) {
    return msg.sender;
  }
}
