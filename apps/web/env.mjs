import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    INFURA_IPFS_ENDPOINT: z.string().url(),
    INFURA_IPFS_GATEWAY: z.string().url(),
    LINEA_TEST_RPC_ENDPOINT: z.string().url(),
    INFURA_API_KEY: z.string(),
    INFURA_API_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_CHAIN_ID: z.string(),
    NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    INFURA_IPFS_ENDPOINT: process.env.INFURA_IPFS_ENDPOINT,
    INFURA_IPFS_GATEWAY: process.env.INFURA_IPFS_GATEWAY,
    LINEA_TEST_RPC_ENDPOINT: process.env.LINEA_TEST_RPC_ENDPOINT,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    INFURA_API_SECRET: process.env.INFURA_API_SECRET,
    NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_EVENTS_FACTORY_CONTRACT_ADDRESS,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
})
