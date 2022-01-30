import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type CarousellPDF = {
  specification_id: number;
  specification_url: string;
};

type PDFCarousellProps = {
  pdfs: CarousellPDF[];
  onClickHandler: (pdf: CarousellPDF) => void;
  callToAction: string;
  label: string;
};

const PDFCarousell = ({
  pdfs,
  onClickHandler,
  callToAction,
  label,
}: PDFCarousellProps) => {
  const [carouselPDFs, setCarouselPDFs] = useState(pdfs);
  const [currIndex, setCurrIndex] = useState(0);

  // PDF rendering stuff
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  if (!pdfs || pdfs.length == 0 || !carouselPDFs) {
    return null;
  }

  const incrementValue = (val, mod) => {
    return (val + 1) % mod;
  };

  const decrementValue = (val, mod) => {
    return val - 1 < 0 ? mod - 1 : val - 1;
  };

  const incrementIndex = () => {
    setCurrIndex((currIndex) => incrementValue(currIndex, carouselPDFs.length));
  };

  const decrementIndex = () => {
    setCurrIndex((currIndex) => decrementValue(currIndex, carouselPDFs.length));
  };

  const incrementPage = () => {
    setPageNumber((pageNumber) => incrementValue(pageNumber - 1, numPages) + 1);
  };

  const decrementPage = () => {
    setPageNumber((pageNumber) => decrementValue(pageNumber - 1, numPages) + 1);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center ">
      <p className="text-lg font-extrabold mb-4">{label}</p>
      <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <p>Prev PDF File</p>
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
        </div>
        <div className="ml-4 flex flex-col items-center">
          <p>Next PDF File</p>
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
      </div>
      <Document
        file={{
          url: carouselPDFs[currIndex].specification_url,
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="flex">
        <div
          onClick={decrementPage}
          className="flex flex-col mr-4 items-center justify-center cursor-pointer"
        >
          <p>Prev Page</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div
          onClick={incrementPage}
          className="flex flex-col ml-4 items-center justify-center cursor-pointer"
        >
          <p>Next Page</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <button
        onClick={(e) => {
          onClickHandler(carouselPDFs[currIndex]);
          setCurrIndex(0);
          setCarouselPDFs(null);
        }}
        className="inline-flex mt-4 rounded-full items-center px-5 py-2 border border-transparent text-base font-medium  shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {callToAction}
      </button>
    </div>
  );
};

export default PDFCarousell;
