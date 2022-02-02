import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { saveAs } from "file-saver";

type PDFViewerProps = {
  pdfs: { url: string }[];
};

const PDFViewer = ({ pdfs }: PDFViewerProps) => {
  const [currIndex, setCurrIndex] = useState(0);

  // PDF rendering stuff
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  if (!pdfs || pdfs.length == 0) {
    return null;
  }

  const incrementValue = (val, mod) => {
    return (val + 1) % mod;
  };

  const decrementValue = (val, mod) => {
    return val - 1 < 0 ? mod - 1 : val - 1;
  };

  const incrementIndex = () => {
    setPageNumber(1);
    setCurrIndex((currIndex) => incrementValue(currIndex, pdfs.length));
  };

  const decrementIndex = () => {
    setPageNumber(1);
    setCurrIndex((currIndex) => decrementValue(currIndex, pdfs.length));
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

  const downloadPDF = () => {
    saveAs(pdfs[currIndex].url, "Specification.pdf", {
      type: "application/pdf;charset=utf-8",
    });
  };

  return (
    <>
      <Button onClick={downloadPDF} className="mb-4">
        Download Specification
      </Button>
      <div className="flex flex-col items-center">
        <div className="flex">
          {currIndex > 0 && (
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
          )}
          {currIndex < pdfs.length - 1 && (
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
          )}
        </div>

        <Document
          file={{
            url: pdfs[currIndex].url,
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="flex">
          {pageNumber > 0 && (
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
          )}
          {pageNumber < numPages - 1 && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
