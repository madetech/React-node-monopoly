pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import './PropertyBase.sol';


contract PropertyOwnership is PropertyBase, ERC721Token {
  function _transfer(address _from, address _to, uint256 _id) internal {
    propertyToOwner[_id] = _to;

    Transfer(_from, _to, _id);
  }

  function buy(uint256 _propertyId) payable {
    require(msg.value >= properties[_propertyId].buy_price);
    //require(propertyToOwner[_propertyId] == getBank());
  }

  function _createProperty(
      bytes32 _name,
      uint32 _color,
      uint16 _buy_price,
      uint16 _rent_price,
      uint8 _number_of_houses,
      uint8 _number_of_hotels
  ) internal returns (Property) {
    // add requires
    Property memory _property = Property({
      name: _name,
      color: _color,
      buy_price: _buy_price,
      rent_price: _rent_price,
      number_of_houses: _number_of_houses,
      number_of_hotels: _number_of_hotels
    });

    uint256 _property_id = properties.push(_property);
    _transfer(0, bankAddress, _property_id);

    return _property;
  }
}
