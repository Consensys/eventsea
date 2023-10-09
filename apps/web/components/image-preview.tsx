import { FC } from "react";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

interface ImagePreviewProps {
  image: File;
  handleOnRemove?: () => void;
  containerClassName?: string;
  imageClassName?: string;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  image,
  handleOnRemove,
  containerClassName,
  imageClassName,
}) => {
  return (
    <div
      className={twMerge(
        "relative flex flex-col p-5 pt-6 pb-4 bg-gray-200 rounded-lg h-[140px] w-[176px]",
        containerClassName
      )}
    >
      <XCircleIcon
        onClick={handleOnRemove}
        className="absolute w-5 h-5 cursor-pointer top-1 right-1 fill-white stroke-gray-900"
      />
      <div className="flex flex-col w-full h-full">
        <div
          className={twMerge(
            "relative w-full h-full aspect-video",
            imageClassName
          )}
        >
          <Image
            alt={image.name}
            fill={true}
            className="object-contain"
            src={URL.createObjectURL(image)}
          />
        </div>
        <p className="py-1 text-sm text-center text-gray-500 truncate">
          {image.name}
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
