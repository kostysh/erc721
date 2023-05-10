/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { task } from 'hardhat/config';
import { Token__factory } from '../typechain';

task('mint', 'Mint single')
  .addParam('contract', 'Address of contract')
  .addParam('to', 'Mint to address')
  .addParam('uri', 'Token URI')
  .setAction(async (args, hre) => {
    const { contract, to, uri } = args;
    const token = Token__factory.connect(contract, hre.ethers.provider);
    const tx = await token.safeMint(to, uri);
    console.log('Transaction:', tx);
    await tx.wait();
    console.log('Transaction succeeded!');
  });

task('mintBulk', 'Mint bulk')
  .addParam('contract', 'Address of contract')
  .addParam('to', 'Mint to addresses')
  .addParam('uri', 'Token URIs')
  .setAction(async (args, hre) => {
    const { contract, to, uri } = args;
    const token = Token__factory.connect(contract, hre.ethers.provider);
    const tx = await token.safeMint(to.split(','), uri.split(','));
    console.log('Transaction:', tx);
    await tx.wait();
    console.log('Transaction succeeded!');
  });