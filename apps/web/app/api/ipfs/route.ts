import { env } from "@/env.mjs";

export async function POST(request: Request, response: Response) {
  const data = await request.formData();
  const baseUrl = env.INFURA_IPFS_ENDPOINT;

  try {
    const res = await fetch(`${baseUrl}/api/v0/add`, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            env.INFURA_API_KEY + ":" + env.INFURA_API_SECRET
          ).toString("base64"),
      },
      body: data,
    });


    const json = await res.json();

    return Response.json({ hash: json.Hash });
  } catch (error) {
    console.error(error);
    throw new Error("Error adding file");
  }
}
