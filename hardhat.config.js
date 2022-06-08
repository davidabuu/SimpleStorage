require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config()
require('./task/block-number')
require('hardhat-gas-reporter')
require('solidity-coverage')
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const ETHERSCAN_API_KEY = process.env.API_URL_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY
const RPC_URL = process.env.RPC_URL;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork:'hardhat',
  networks: {
    rinkeby:{
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId:4
    },
    localhost:{
      url:'http://127.0.0.1:8545/',
      chainId: 31337
    }
  },
  solidity: '0.8.7',
  etherscan:{
    apiKey:ETHERSCAN_API_KEY
  },
  gasReporter:{
    enabled:true,
    outputFile:'gas-report.txt',
    noColor:false,
    currency:'USD',
    coinmarketcap:process.env.COIN_KEY,
    token:'MATRIC'
  }
};
