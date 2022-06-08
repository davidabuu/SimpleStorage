const { expect, assert } = require('chai');
const { ethers } = require('hardhat');
describe('SimpleStorage', () => {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it('Should Start witha favourite number of 0', async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';
    assert.equal(currentValue.toString(), expectedValue);
  });
  it('Should Update', async () => {
    const updatedValue = await simpleStorage.store('4');
    const newNumber = '4';
    await updatedValue.wait(1);
    //assert.equal(updatedValue.toString(), newNumber);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), newNumber);
  });
});
