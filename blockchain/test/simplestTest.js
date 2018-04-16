var Players = artifacts.require("./Players.sol");

contract('Player', function(accounts) {
  it("can join the game", function() {
    return Players.deployed().then(function(instance) {
      instance.join("bob");
    });
  });

  it("can find out the players in the game", function() {
    return Players.deployed().then(function(instance) {
      instance.join("bob")
      return instance.get().then(function(result) {
        assert.equal(result, ["bob"])
      })
    });
  });
});
