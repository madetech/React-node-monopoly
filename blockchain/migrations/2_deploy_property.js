var PropertyAccessControl = artifacts.require("./PropertyAccessControl.sol");
var PropertyBase = artifacts.require("./PropertyBase.sol");
var PropertyOwnership = artifacts.require("./PropertyOwnership.sol");
var ERC721Token = artifacts.require('zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol');
var GameSetup = artifacts.require('./GameSetup.sol');
var Jail = artifacts.require('./Jail.sol');

module.exports = function(deployer) {
  deployer.deploy(PropertyAccessControl);

  deployer.link(PropertyAccessControl, PropertyBase);
  deployer.deploy(PropertyBase);

  deployer.link(PropertyBase, PropertyOwnership);
  deployer.deploy(ERC721Token);

  deployer.link(ERC721Token, PropertyOwnership);
  deployer.deploy(PropertyOwnership);

  deployer.link(PropertyOwnership, GameSetup);
  deployer.deploy(GameSetup);

  deployer.link(PropertyAccessControl, Jail);
  deployer.deploy(Jail);
};
