import WalletIcon from "../public/icons/WalletIcon";
import { Button } from "./ui/Button";
import { useSDK } from "@metamask/sdk-react";
import { formatAddress } from "./../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type Props = {
  setShowModal: (showModal: boolean) => void;
};

export const ConnectWalletButton: React.FC<Props> = ({ setShowModal }) => {
  const { sdk, connected, account } = useSDK();

  const disconnect = () => {
    sdk?.terminate();
  };

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button variant="primary">{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-white border rounded-md shadow-lg right-0 z-10 top-10">
            <button className="block w-full pl-2 pr-4 py-2 text-left hover:bg-gray-200">
              My Events
            </button>
            <button className="block w-full pl-2 pr-4 py-2 text-left hover:bg-gray-200">
              Wallet Details
            </button>
            <button
              onClick={disconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          className="flex gap-4"
          onClick={() =>
            setShowModal(((prev: boolean) => !prev) as unknown as boolean)
          }
        >
          <WalletIcon /> Login
        </Button>
      )}
    </div>
  );
};
