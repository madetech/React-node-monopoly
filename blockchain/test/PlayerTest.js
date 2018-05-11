var Players = artifacts.require("./Players.sol");

contract('Player', function(accounts) {
  it("can join the game", function() {
    return Players.new().then(function(instance) {
      instance.join("bob", { value: 1 });
    });
  });

  it("can find my player name", function() {
    return Players.new().then(function(instance) {
      instance.join("bob", { value: 1 });
      return instance.getCurrentPlayer().then(function(result) {
        assert.equal(result[0], "bob");
      });
    });
  });

  it("can find my player balance", function() {
    return Players.new().then(function(instance) {
      instance.join("bob", { value: 1 });
      return instance.getCurrentPlayer().then(function(result) {
        assert.equal(result, 1500);
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

  it("requires at least 1 ETH", function(){
    return Players.new().then(function(instance) {
      instance.join("bob", { value: 0.999 }).catch(function(result) {
        assert.ok(true);
      });
    });
  })

  it("requires no more than 1 ETH", function(){
    return Players.new().then(function(instance) {
      instance.join("bob", { value: 1.001 }).catch(function(result) {
        assert.ok(true);
      });
    });
  });
});
