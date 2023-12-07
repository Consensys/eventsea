# EventSea: A Decentralized Events Platform

---

### Overview:

EventSea is a decentralized events platform for events organizers and attendees. Built on the top of Linea, EventSea offers a transparent, secure, and user-centric platform for event creation and ticketing.

![image](./eventsea.png)

#### Key Features:

- Decentralized Event Creation:
  Users have the freedom to create their own events without the need for intermediaries or centralized platforms.
  Complete control over event details, ticketing, and updates.

- Mintable Tickets:
  Participants can mint their own tickets, ensuring authenticity and reducing the risk of counterfeit tickets.
  Each ticket is a unique digital asset on the blockchain, providing traceability and security.

##### RoadMap:

- Adding Ticket Validation:
  EventSea will offer built-in ticket validation mechanisms, ensuring that each ticket is genuine and corresponds to a legitimate purchase.
  Attendees can confidently attend events knowing their tickets are valid and recognized by the platform.

#### Benefits:

- Transparency: Every transaction, from event creation to ticket minting, is recorded on the blockchain, ensuring complete transparency and trustworthiness.

- Security: Leveraging the power of blockchain technology, EventSea ensures that all events and tickets are secure from fraud and unauthorized changes.
- User Empowerment: EventSea empowers users to take control of their events, from creation to ticketing, without relying on third-party platforms or agencies.

### Apps and Packages

- `blockchain`: Contracts
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
