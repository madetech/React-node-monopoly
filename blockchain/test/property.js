var Game = artifacts.require("./GameSetup.sol");

contract('Game', function(accounts) {
  it("should setup a game with initial property token", async function() {
    game = await Game.deployed();
    await game.setup();
    banker = await game.getBank.call();
    assert.equal(await game.getProperty.call(1), banker);
  });

  // it("should setup a game with initial property token", function() {
  //   return Game.deployed().then(function(instance) {
  //     setup = instance;
  //
  //     setup.setup();
  //     return setup;
  //   }).then(function(instance) {
  //     banker = instance.getBank.call();
  //     return banker;
  //   }).then(function(banker){
  //     bankAddress = banker;
  //     return setup.getProperty.call(1)
  //   }).then(function(propertyOwnerAddress){
  //     assert.equal(bankAddress, propertyOwnerAddress)
  //   })
  // });
  //
  // it("should disallow to buy if not enough money", function() {
  //   return Game.deployed().then(function(instance) {
  //     game = instance;
  //
  //     game.setup();
  //     return game;
  //   }).then(function(game) {
  //     firstAccount = accounts[0];
  //     return true;
  //   }).then(function(flag) {
  //     try {
  //       game.buy(1, { value: 20000, from: firstAccount });
  //       assert.fail('Bought property for too little gas...');
  //     }
  //     catch(err) {
  //       assert.ok;
  //     }
  //   });
  // });
});
