/* eslint-disable @typescript-eslint/unbound-method */
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { Token__factory } from '../typechain';

const addresses: string[] = [];
const uris: string[] = [];

if (addresses.length !== uris.length) {
  throw new Error('Invalid bulk mint configuration! Length of both arrays must be equal!');
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, network, deployments, getNamedAccounts } = hre;

  if (!['hardhat', 'optimism'].includes(network.name)) {
    return;
  }

  const { deploy } = deployments;
  const { owner } = await getNamedAccounts();

  // Simple ERC20 token
  const token = await deploy('Token', {
    from: owner,
    log: true,
    autoMine: true,
  });

  if (token.newlyDeployed) {
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Token (erc721) was deployed at: ${token.address} using ${token.receipt?.gasUsed} gas`,
    );
  }

  if (network.name === 'optimism' && addresses.length > 0) {
    // Send safeMinBulk transaction
    const contract = Token__factory.connect(token.address, ethers.provider);
    const tx = await contract.safeMintBulk(addresses, uris);
    console.log('Minting Transaction:', tx);
    await tx.wait();
    console.log('Transaction succeeded!');
  }
};

export default func;
func.tags = ['Token'];
