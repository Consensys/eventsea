import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const CardSkeleton = ({
    image,
    setIsLoading,
  }: {
    image?: string;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }) => {
    return (
      <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg">
        <Image
          src={`https://brown-secondary-tiglon-822.mypinata.cloud/ipfs/${image}`}
          alt="Event image"
          layout="fill"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className="opacity-0"
        />
      </div>
    );
  };