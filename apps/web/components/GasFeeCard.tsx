import useSWR, { mutate } from "swr";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, InfoIcon } from "lucide-react";
import { useSDK } from "@metamask/sdk-react";

const REFETCH_INTERVAL = 10000;
const STEP_INTERVAL = 1000;
const NETWORK_LATENCY = 2000; // rough estimate of network latency to consider when refetching

// format the gas price nicely for small values
const formatGweiValues = (value: string) => {
  const gwei = parseFloat(value);

  if (gwei < 0.01) {
    return gwei.toExponential(2);
  } else {
    return gwei.toFixed(2);
  }
};

export function GasFeeCard() {
  const { chainId } = useSDK();

  const Auth = Buffer.from(
    process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_SECRET
  ).toString("base64");

  const [countdown, setCountdown] = useState(REFETCH_INTERVAL);
  const [previousChainId, setPreviousChainId] = useState(chainId);

  useEffect(() => {
    if (countdown <= NETWORK_LATENCY && chainId === previousChainId) {
      mutate("gas/suggestedGasFees");
      mutate("gas/baseFeePercentile");
    }
  }, [countdown, chainId, previousChainId, mutate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((oldCountdown) => {
        if (chainId !== previousChainId || oldCountdown <= 0) {
          setPreviousChainId(chainId);
          return REFETCH_INTERVAL;
        } else {
          return oldCountdown - STEP_INTERVAL;
        }
      });
    }, STEP_INTERVAL);

    return () => clearInterval(interval);
  }, [chainId, previousChainId]);

  const fetcher = (endpoint: string) =>
    fetch(
      `https://gas.api.infura.io/networks/${parseInt(
        chainId || "0xe704"
      )}/${endpoint}`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    ).then((res) => res.json());

  const {
    data: gasPrices,
    error: gasPricesError,
    isLoading: gasPricesLoading,
  } = useSWR("gas/suggestedGasFees", () => fetcher("suggestedGasFees"));

  const {
    data: baseFeePercentile,
    error: percentileError,
    isLoading: percentileLoading,
  } = useSWR("gas/baseFeePercentile", () => fetcher("baseFeePercentile"));

  if (gasPricesLoading || percentileLoading) {
    return <p>loading</p>;
  }

  if (gasPricesError || percentileError) {
    return <p className="text-red-500">error</p>;
  }

  const trendingUp = gasPrices?.baseFeeTrend === "up";
  const trendingDown = gasPrices?.baseFeeTrend === "down";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          <div className="flex space-x-1">
            <div className="w-6 h-6">
              <CircularProgressbarWithChildren
                strokeWidth={12}
                styles={buildStyles({
                  pathColor: trendingUp ? "red" : "green",
                })}
                value={
                  ((REFETCH_INTERVAL - countdown) / REFETCH_INTERVAL) * 100
                }
              >
                <>
                  {trendingUp && (
                    <ArrowUp
                      className="animate-bounceUp"
                      color="red"
                      size={14}
                    />
                  )}
                  {trendingDown && (
                    <ArrowDown
                      className="animate-bounceDown"
                      color="green "
                      size={14}
                    />
                  )}
                </>
              </CircularProgressbarWithChildren>
            </div>
            <p>
              ~{formatGweiValues(gasPrices?.estimatedBaseFee)}
              Gwei
            </p>
            <InfoIcon size={14} />
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="p-0 w-80">
        <div className="p-2 space-y-4">
          <p>
            This is an <strong>estimated base gas fee.</strong>
          </p>
          <p>
            50% of the historical base fees are less then or equal to{" "}
            <strong>
              ~{formatGweiValues(baseFeePercentile?.baseFeePercentile)} Gwei
            </strong>
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
