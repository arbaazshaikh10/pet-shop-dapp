var Adoption = artifacts.require("Adoption");

contract("Adoption", function(accounts) {
  describe('First Group of tests', () => {
    let instance;

    before(async() => {
      instance =await Adoption.deployed();
    });
    
    it('User should adapt a pet', async() => {
      await instance.adopt.sendTransaction(8,{from:accounts[0]});
      let adopter = await instance.adopters.call(8);
      assert.equal(adopter, accounts[0], "Incorrect owner address");
    });

    it('Should get adopter address by pet ID in array', async() => {
      let adopters = await instance.getAdopters.call();
      assert.equal(adopters[8], accounts[0], "Owner of pet id should be recorded in array");
    });

    it('Should throw if invalid pet id is given', async() => {
      try {
        await instance.adopt.sendTransaction(17,{from: accounts[0]});
        assert.fail(true,false,"This function did not throw");
      } catch (error) {
        assert.include(String(error), "revert", 'expected "revert" but instead got ${error}');
      }
    });

  });
});
