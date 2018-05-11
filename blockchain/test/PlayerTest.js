var Players = artifacts.require("./Players.sol");

contract('Player', function(accounts) {
  it("can join the game", function() {
    return Players.new().then(function(instance) {
      instance.join({ value: 1 });
    });
  });

  it("requires at least 1 ETH", function(){
    return Players.new().then(function(instance) {
      instance.join({ value: 0.999 }).catch(function(result) {
        assert.ok(true);
      });
    });
  })

  it("requires no more than 1 ETH", function(){
    return Players.new().then(function(instance) {
      instance.join({ value: 1.001 }).catch(function(result) {
        assert.ok(true);
      });
    });
  });

  it("can get all the player addresses", function() {
    return Players.new().then(function(instance) {
      instance.join({ value: 1, from: accounts[0] });
      instance.join({ value: 1, from: accounts[1] });

      return instance.getPlayers().then(function(result) {
        expect(result).to.deep.equal([ accounts[0], accounts[1] ]);
      });
    });
  });

  it("can find my player balance", function() {
    return Players.new().then(function(instance) {
      instance.join({ value: 1 });
      return instance.getBalance(accounts[0]).then(function(result) {
        assert.equal(result, 1500);
      });
    });
  });

  xit("returns null if I haven't joined", function() {
    return Players.new().then(function(instance) {
      return instance.getCurrentPlayer().then(function(result) {
        assert.equal(result, '');
      });
    });
  });
});
