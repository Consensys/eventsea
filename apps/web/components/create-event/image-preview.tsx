import { FC } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/Button";

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
      <Button variant="outline" size="icon">
        <X
          onClick={handleOnRemove}
          size={16}
          className="absolute top-1 right-1 "
        />
      </Button>
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
