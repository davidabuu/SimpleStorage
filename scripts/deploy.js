const { ethers, run, network } = require('hardhat');
async function main() {
  const simpleStorgageFactory = await ethers.getContractFactory(
    'SimpleStorage'
  );
  const simplesStorage = await simpleStorgageFactory.deploy();
  await simplesStorage.deployed();
  console.log(simplesStorage.address);
  if (network.config.chainId === 4 && process.env.API_URL_KEY) {
    await simplesStorage.deployTransaction.wait(6);
    await verify(simplesStorage.address, []);
  }
  const currentValue = await simplesStorage.retrieve();
  console.log(currentValue);
  //Update the current Value
  const transactionResponse = await simplesStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simplesStorage.retrieve();
  console.log(updatedValue)
}
//Verify
async function verify(contractAddress, args) {
  try {
    await run('verify:verify', {
      address: contractAddress,
      construtorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified');
    } else {
      console.log(error);
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
