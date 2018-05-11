pragma solidity ^0.4.19;

import './PropertyAccessControl.sol';

contract Jail is PropertyAccessControl {
  mapping (address => bool) public jailStatus;

  function getJailedStatus(address _player) external view returns(bool) {
    return jailStatus[_player];
  }

  function inprison(address _player) external onlyBank {
    jailStatus[_player] = true;
  }

  function free(address _player) external onlyBank {
    jailStatus[_player] = false;
  }
}
