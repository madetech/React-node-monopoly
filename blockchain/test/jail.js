var Jail = artifacts.require("./Jail.sol");

contract('Jail', accounts => {
   it("does not jail people by default", async () => {
     const jail = await Jail.deployed();
     const somePlayer = accounts[1];
     const jailedStatus = await jail.getJailedStatus.call(somePlayer);

     assert.equal(jailedStatus, false);
   });

   it("allows to jail people", async () => {
     const jail = await Jail.deployed();
     const otherPlayer = accounts[2];

     await jail.inprison(otherPlayer);
     const jailedStatus = await jail.getJailedStatus.call(otherPlayer);

     assert.equal(jailedStatus, true);
   });

   it("allows to free people", async () => {
     const jail = await Jail.deployed();
     const differentPlayer = accounts[3];

     await jail.inprison(differentPlayer);
     await jail.free(differentPlayer);
     const jailedStatus = await jail.getJailedStatus.call(differentPlayer);

     assert.equal(jailedStatus, false);
   });
});
