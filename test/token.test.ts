import { expect } from 'chai';
import { User, setup } from './setup';
import { BigNumber, constants } from 'ethers';

describe('Token', () => {
  let owner: User;
  let user: User;

  before(async () => {
    const { users } = await setup();
    owner = users.owner;
    user = users.user;
  });

  describe('#safeMint(address,string)', () => {
    it('should throw if called by non-owner', async () => {
      await expect(user.token.safeMint(user.address, user.address))
        .to.revertedWith('Ownable: caller is not the owner');
    });

    it('should mint token', async () => {
      const total = await owner.token.totalSupply();
      const tx = await owner.token.safeMint(user.address, user.address);
      await expect(tx).emit(owner.token, 'Transfer').withArgs(
        constants.AddressZero,
        user.address,
        total,
      );
      expect(await owner.token.tokenURI(total)).to.eq(user.address);
    });
  });

  describe('#safeMintBulk(address[],string[])', () => {
    let bulkAddresses: string[];
    let bulkUris: string[];

    before(() => {
      bulkAddresses = [owner.address, user.address];
      bulkUris = [owner.address, user.address];
    });

    it('should throw if called by non-owner', async () => {
      await expect(user.token.safeMintBulk(bulkAddresses, bulkUris))
        .to.revertedWith('Ownable: caller is not the owner');
    });

    it('should mint tokens', async () => {
      let total = await owner.token.totalSupply();
      const tx = await owner.token.safeMintBulk(bulkAddresses, bulkUris);
      await expect(tx).emit(owner.token, 'Transfer').withArgs(
        constants.AddressZero,
        owner.address,
        total,
      );
      await expect(tx).emit(owner.token, 'Transfer').withArgs(
        constants.AddressZero,
        user.address,
        total.add(BigNumber.from(1)),
      );
    });
  });
});