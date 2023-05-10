# Simple ERC712 token

## Environment

Create in the repository root `.env` file with the following content:

```
RPC_URI=https://opt-mainnet.g.alchemy.com/v2/<api_key>
KEY=<your_private_key>
```

> !!! do not commit or share your `.env` file with the private key

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
