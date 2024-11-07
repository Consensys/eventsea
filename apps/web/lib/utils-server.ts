'use server';

import { env } from "@/env.mjs";

export const getNetworkRPC = async (network: string) => {
    switch (network) {
      case "31337":
        return "http://127.0.0.1:8545/";
      case "59141":
        return `${env.LINEA_TEST_RPC_ENDPOINT}/${env.INFURA_API_KEY}`;
      default:
        throw new Error(`Unsupported network: ${network}`);
    }
  };