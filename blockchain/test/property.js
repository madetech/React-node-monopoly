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

   it("should allow to buy when more than enough money sent", async () => {
     const deployed_game = await Game.deployed()
     await deployed_game.setup();

     await deployed_game.buy(1, { value: 2000, from: accounts[1] });
     const newOwner = await deployed_game.getPropertyOwner.call(1)
     assert.equal(newOwner, accounts[1])
   });

   it("takes money from the purchaser", async () => {
     const deployed_game = await Game.deployed()
     await deployed_game.setup();
     const initial_balance = await web3.eth.getBalance(accounts[1]).toNumber();
     const txInfo = await deployed_game.buy(1, { value: web3.toWei(10, "ether"), from: accounts[1] });
     const final_balance = await web3.eth.getBalance(accounts[1]).toNumber();

     const tx = await web3.eth.getTransaction(txInfo.tx);
     const gasCost = tx.gasPrice.mul(txInfo.receipt.gasUsed);

     assert.equal(
       parseInt(web3.fromWei(initial_balance, "ether")) - 10 - parseInt(web3.fromWei(gasCost, "ether")),
       parseInt(web3.fromWei(final_balance, "ether")))
   });

   it("refunds", async () => {
     const deployed_game = await Game.deployed()
     await deployed_game.setup();
     const initial_balance = await web3.eth.getBalance(accounts[1]).toNumber();
     const txInfo = await deployed_game.buy(1, { value: web3.toWei(20, "ether"), from: accounts[1] });
     const final_balance = await web3.eth.getBalance(accounts[1]).toNumber();

     const tx = await web3.eth.getTransaction(txInfo.tx);
     const gasCost = tx.gasPrice.mul(txInfo.receipt.gasUsed);

     assert.equal(
       parseInt(web3.fromWei(initial_balance, "ether")) - 10 - parseInt(web3.fromWei(gasCost, "ether")),
       parseInt(web3.fromWei(final_balance, "ether")))
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
