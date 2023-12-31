"use server";

let baseUrl = `${process.env["INFURA_IPFS_ENDPOINT"]}/api/v0/add`;

const generateSVG = (svg: string) => {
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);
  return svgUrl;
};

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

export const addImg = async (image: string) => {
  const formData = new FormData();
  const svg = generateSVG(image);

  formData.append("file", svg);

  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_SECRET
          ).toString("base64"),
      },
      body: formData,
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

type Metadata = {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: number;
  }[];
};

export const addTokenMetadata = async (metadata: Metadata) => {
  const formData = new FormData();
  formData.append("file", JSON.stringify(metadata));
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env["INFURA_API_KEY"] +
              ":" +
              process.env["INFURA_API_SECRET"]
          ).toString("base64"),
      },
      body: formData,
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
  let baseUrl = `https://ipfs.infura.io:5001/api/v0/add`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env["INFURA_API_KEY"] +
              ":" +
              process.env["INFURA_API_SECRET"]
          ).toString("base64"),
      },
      body: data,
    });

    return (await response.json()).Hash;
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
