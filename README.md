# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

-  `blockchain`: Contracts
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Running locally

The front end accesses the deployed smart contract `EventFactory` via
`NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS` environment variable

Below command will start the nextjs app and run a local hardhat node

```
npm run dev
```

Then you have to compile the contracts. Run this command 

```
npm run compile
```

If you wish to deploy it to the local hardhat node run below command

```
npm run deploy:local
```

In order to deploy it to linea testnet after compile step

```
npm run deploy:test
```

