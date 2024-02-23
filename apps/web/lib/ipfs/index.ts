"use server";

let baseUrl = `${process.env["PINATA_IPFS_ENDPOINT"]}/pinning/pinFileToIPFS`;
let jsonBaseUrl = `${process.env["PINATA_IPFS_ENDPOINT"]}/pinning/pinJSONToIPFS`;
const JWT = process.env["PINATA_API_KEY"];

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

type AddOptions =
  | {
      blob: Blob;
      fileName: string;
    }
  | {
      files: File[];
    }
  | {
      file: File;
    };

export const add = async (data: FormData) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    });
    if (!response.ok) {
      throw new Error("Error adding file");
    }
    return (await response.json()).IpfsHash as string;
  } catch (error) {
    console.error("Error adding file", error);
  }
};

export const cat = async (hash: string) => {
  const response = await fetch(
    `${process.env.INFURA_IPFS_ENDPOINT}/api/v0/cat?arg=${hash}`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_SECRET
          ).toString("base64"),
      },
    }
  );

  return await response.json();
};

export const getDirectoryContent = async (hash: string): Promise<string[]> => {
  const dirResponse = await fetch(`https://dweb.link/api/v0/ls?arg=${hash}`);

  const directory = await dirResponse.json();

  return directory.Objects[0].Links.map((sc: any) => sc.Hash);
};
