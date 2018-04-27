var Game = artifacts.require("./GameSetup.sol");

contract('Game', accounts => {
   it("should setup a game with initial property token", async () => {
     const deployed_game = await Game.deployed()
     await deployed_game.setup();

     const banker = await deployed_game.getBank.call();
     const firstPropertyOwner = await deployed_game.getPropertyOwner.call(1);

     assert.equal(banker, firstPropertyOwner)
   });

   it("should allow to buy when enough money sent", async () => {
     const deployed_game = await Game.deployed()
     await deployed_game.setup();

     await deployed_game.buy(1, { value: 200, from: accounts[1] });
     const newOwner = await deployed_game.getPropertyOwner.call(1)
     assert.equal(newOwner, accounts[1])
   });

   it("should disallow to buy if not enough money sent", async () => {
     const deployed_game = await Game.deployed()
     await deployed_game.setup();

     try {
       await deployed_game.buy(1, { value: 19, from: accounts[1] });
       assert.fail;
     }
     catch(err) {
       assert.ok(/revert/.test(err.message));
     }
   });
});
