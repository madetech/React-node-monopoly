pragma solidity ^0.4.19;

contract PropertyAccessControl {
  address bankAddress = 0x26006236eaB6409D9FDECb16ed841033d6B4A6bC;

  modifier onlyBank() {
    require(
        msg.sender == bankAddress
    );
    _;
  }

  function setBank(address _newBank) external onlyBank {
    bankAddress = _newBank;
  }

  function getBank() public view returns(address) {
    return bankAddress;
  }
}
