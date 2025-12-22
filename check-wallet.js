require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const provider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

console.log('Wallet Address:', provider.getAddress());
console.log('\nMake sure this address has Sepolia ETH!');

provider.engine.stop();
