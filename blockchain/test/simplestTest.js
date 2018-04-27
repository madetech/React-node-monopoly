var Players = artifacts.require("./Players.sol");

contract('Player', function(accounts) {
  it("can join the game", function() {
    return Players.new().then(function(instance) {
      instance.join("bob");
    });
  });

  it("can find my player name", function() {
    return Players.new().then(function(instance) {
      instance.join("bob");
      return instance.getCurrentPlayer().then(function(result) {
        assert.equal(result, "bob");
      });
    });
  });

  it("returns null if I haven't joined", function() {
    return Players.new().then(function(instance) {
      return instance.getCurrentPlayer().then(function(result) {
        assert.equal(result, '');
      });
    });
  });
});
