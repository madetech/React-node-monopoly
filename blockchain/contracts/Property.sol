pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';


contract Property is ERC721Token {
  bytes32 name;

  function Property() public {
    name = "PropertyName";
  }

  function getName() public view returns(bytes32) {
    return name;
  }

}
