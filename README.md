# Simple ERC712 token

## Configuration

Create in the repository root `.env` file with the following content:

```
RPC_URI=https://opt-mainnet.g.alchemy.com/v2/<api_key>
KEY=<your_private_key>
```

> !!! do not commit or share your `.env` file with the private key

> Do not forget to update your token `name` and `symbol` in the file `./contracts/Token.sol` (line 16)

## Setup

```bash
yarn
yarn compile
```

## Testing

```bash
yarn test
```

## Deployment

If you want to send bulk minting transaction during a deployment you have to edit ./deploy/0001.ts file.
Add addresses and unique URIs of tokens respectfully to arrays: `addresses` and `uris`.

To start deployment use command:

```bash
yarn hardhat --network optimism deploy
```

## Contract verification

```bash
yarn hardhat --network optimism etherscan-verify
```

or

```bash
yarn hardhat --network optimism verify <CONTRACT_ADDRESS>
```

## Tasks

There is available the following tasks:

- `mint`: Single token minting

```bash
yarn hardhat --network optimism mint --contract <CONTRACT_ADDRESS> --to <TO_ADDRESS> --uri <URI>
```

- `mintBulk`: Multiple tokens minting

> !!! Comma-separated addresses and URIs must be equal by elements length

```bash
yarn hardhat --network optimism mint --contract <CONTRACT_ADDRESS> --to <TO_ADDRESSES_COMMA_SEPARATED> --uri <URIS_COMMA_SEPARATED>
```


