var Game = artifacts.require("./GameSetup.sol");

contract('Game', function() {
  it("should setup a game with initial property token", function() {
    return Game.deployed().then(function(instance) {
      setup = instance;

      setup.setup();
      return setup;
    }).then(function(instance) {
      banker = instance.getBank.call();
      return banker;
    }).then(function(banker){
      bankAddress = banker;
      return setup.getProperty.call(1)
    }).then(function(propertyOwnerAddress){
      assert.equal(bankAddress, propertyOwnerAddress)
    })
  });
});
