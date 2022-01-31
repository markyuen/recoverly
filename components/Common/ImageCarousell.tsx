import React, { useState } from "react";
import Image from "next/image";

export type CarousellImage = {
  image_id: number;
  image_url: string;
};

type ImageCarousellProps = {
  images: CarousellImage[];
  onClickHandler: (image: CarousellImage) => void;
  callToAction: string;
  label: string;
};

const ImageCarousell = ({
  images,
  onClickHandler,
  callToAction,
  label,
}: ImageCarousellProps) => {
  const [currIndex, setCurrIndex] = useState(0);

  if (!images || images.length == 0) {
    return null;
  }

  const incrementIndex = () => {
    setCurrIndex((currIndex) => (currIndex + 1) % images.length);
  };

  const decrementIndex = () => {
    setCurrIndex((currIndex) =>
      currIndex - 1 < 0 ? images.length - 1 : currIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center ">
      <p className="text-lg font-extrabold mb-4">{label}</p>
      <div className="flex px-10 justify-between items-center">
        <svg
          onClick={decrementIndex}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer mr-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <Image
          className=""
          src={images[currIndex].image_url}
          width={300}
          height={300}
          alt={"Image Carousell Image"}
        />
        <svg
          onClick={incrementIndex}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer ml-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
      <div
        onClick={(e) => {
          onClickHandler(images[currIndex]);
          setCurrIndex(0);
        }}
        className="inline-flex mt-4 rounded-full items-center px-5 py-2 border border-transparent text-base font-medium  shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      >
        {callToAction}
      </div>
    </div>
  );
};

export default ImageCarousell;
