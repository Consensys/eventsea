import { MetaMaskProvider as MetaMaskContextProvider } from "@metamask/sdk-react";
import { FC } from "react";

interface MetaMaskProviderProps {
  children: React.ReactNode;
}

const MetaMaskProvider: FC<MetaMaskProviderProps> = ({ children }) => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "EventSea",
      url: host,
    },
  };

  return (
    <MetaMaskContextProvider debug={false} sdkOptions={sdkOptions}>
      {children}
    </MetaMaskContextProvider>
  );
};

export default MetaMaskProvider;
