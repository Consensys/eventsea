import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chainId = searchParams.get("chainId");

  const Auth = Buffer.from(
    process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_SECRET
  ).toString("base64");

  const gasPricesResp = await fetch(
    `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
    {
      headers: {
        Authorization: `Basic ${Auth}`,
      },
    }
  );

  const baseFeePercentileRes = await fetch(
    `https://gas.api.infura.io/networks/${chainId}/baseFeePercentile`,
    {
      headers: {
        Authorization: `Basic ${Auth}`,
      },
    }
  );

  const gasPricesData = await gasPricesResp.json();
  const baseFeePercentileData = await baseFeePercentileRes.json();

  return NextResponse.json({
    estimatedBaseFee: gasPricesData.estimatedBaseFee,
    baseFeeTrend: gasPricesData.baseFeeTrend,
    baseFeePercentile: baseFeePercentileData.percentile,
  });
}
