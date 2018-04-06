var Player = artifacts.require("./Player.sol");

contract("Player", () =>
  it("passes", () => {
    Player.deployed().then((instance) =>
      assert.equal(instance.getName(), "")
    )
  })
)
