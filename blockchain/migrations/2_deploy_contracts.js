var Players = artifacts.require("./Players.sol");

module.exports = function(deployer) {
  deployer.deploy(Players);
};
