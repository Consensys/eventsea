import MetaMaskIcon from "./icons/MetaMaskIcon";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSDK } from "@metamask/sdk-react";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ConnectionModal: React.FC<Props> = ({ open, setOpen }) => {
  const { sdk } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
      setOpen(false);
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 backdrop-blur-sm bg-opacity-75 transition-opacity"></div>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="sm:items-start">
                  <div className="flex p-4 border-b">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      Connect Wallet
                    </Dialog.Title>
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-6">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please select your preferred{" "}
                          <strong>wallet provider</strong> below and follow the
                          prompts to <strong>connect your wallet</strong>.
                        </p>
                        <br />
                        <p className="text-sm text-gray-500">
                          Once connected, you&apos;ll be able to fully explore{" "}
                          <strong>EventSea</strong> and complete transactions
                          with ease.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={connect}
                    className="mt-4 w-full flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-100"
                  >
                    <MetaMaskIcon /> MetaMask
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
