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

  const [countdown, setCountdown] = useState(REFETCH_INTERVAL);
  const [currentChainId, setCurrentChainId] = useState(chainId);

  useEffect(() => {
    if (chainId !== currentChainId) {
      setCurrentChainId(chainId);
      mutate("gas-data");
      if (countdown < NETWORK_LATENCY) {
        setCountdown(REFETCH_INTERVAL + NETWORK_LATENCY);
      }
      setCountdown(REFETCH_INTERVAL);
    }
  }, [countdown, chainId, currentChainId, mutate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((oldCountdown) => {
        if (oldCountdown <= 0) {
          mutate("gas-data");
          return REFETCH_INTERVAL;
        } else {
          return oldCountdown - STEP_INTERVAL;
        }
      });
    }, STEP_INTERVAL);

    return () => clearInterval(interval);
  }, [chainId]);

  const fetcher = () =>
    fetch(`/api/gas?&chainId=${parseInt(chainId || "0xe704")}`).then((res) =>
      res.json()
    );

  const {
    data: gasData,
    error: gasDataError,
    isLoading: gasDataLoading,
  } = useSWR("gas-data", fetcher);

  if (gasDataLoading) {
    return <p>loading</p>;
  }

  if (gasDataError) {
    return <p className="text-red-500">error</p>;
  }

  const trendingUp = gasData?.baseFeeTrend === "up";
  const trendingDown = gasData?.baseFeeTrend === "down";

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
              ~{formatGweiValues(gasData?.estimatedBaseFee)}
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
              ~{formatGweiValues(gasData?.baseFeePercentile)} Gwei
            </strong>
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
