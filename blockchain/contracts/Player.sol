pragma solidity ^0.4.18;

contract Player {
  // bytes32 local_name;

  // function Player(bytes32 name) public {
  //   local_name = name;
  // }

  function getName() public view returns(string name) {
    // return local_name;
    return "hello";
  }
}
