var Players = artifacts.require("./Players.sol");

contract('Player', function(accounts) {
  it("can join the game", function() {
    return Players.deployed().then(function(instance) {
      instance.join("bob");
    });
  });
});

// If this test is uncommented, then the tests pass.
// If it's commented, the tests fail.
// wtf.
;
// contract('Player', function(accounts) {
//   it("can find my player name", function() {
//     return Players.deployed().then(function(instance) {
//       instance.join("bob");
//       return instance.getCurrentPlayer().then(function(result) {
//         assert.equal(result, "bob");
//       });
//     });
//   });
// });

contract('Player', function(accounts) {
  it("returns null if I haven't joined", function() {
    return Players.deployed().then(function(instance) {
      return instance.getCurrentPlayer().then(function(result) {
        assert.equal(result, '');
      });
    });
  });
});
