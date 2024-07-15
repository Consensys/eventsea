"use server";
import { env } from "@/env.mjs";
let baseUrl = env.INFURA_IPFS_ENDPOINT;
let jsonBaseUrl = `${env["PINATA_IPFS_ENDPOINT"]}/pinning/pinJSONToIPFS`;
const JWT = env["PINATA_API_KEY"];

export const getSVGFromBlobUrl = async (blobUrl: string) => {
  try {
    const response = await fetch(blobUrl);
    if (response.ok) {
      const svgText = await response.text();
      return svgText;
    } else {
      ("Error getting SVG from blob URL");
    }
  } catch (error) {
    console.error("Error getting the SVG", error);
    return null;
  }
};

type Metadata = {
  name: string;
  keyvalues: {
    description: string;
    image: string;
    attributes: {
      trait_type: string;
      value: number;
    }[];
  };
};

export const addTokenMetadata = async (metadata: Metadata) => {
  try {
    const res = await fetch(jsonBaseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
