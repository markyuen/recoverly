import React from "react";
import useChakraToast from "../../hooks/useChakraToast";

type FormMultipleFileUploadProps = {
  label: string;
  supported_file_types: string[];
  value: File[];
  dispatch: any;
  action_type: string;
  remove_type: string;
};

const FormMultipleFileUpload = ({
  label,
  supported_file_types,
  value,
  dispatch,
  action_type,
  remove_type,
}: FormMultipleFileUploadProps) => {
  const { generateWarningToast, generateSuccessToast } = useChakraToast();
  const addSingleFile = (new_file: File) => {
    if (
      value &&
      value.filter((item) => item.name === new_file.name).length > 0
    ) {
      generateWarningToast(
        "Duplicate File Uploaded",
        `Duplicate File with the same name of ${new_file.name} was uploaded`
      );
      return;
    }
    if (
      supported_file_types.filter((file_type) =>
        new_file.type.includes(file_type)
      ).length == 0
    ) {
      generateWarningToast(
        "Invalid File Extension",
        `${
          new_file.name
        } could not be uploaded as it has a invalid file type. We currently only support file extensions of ${supported_file_types
          .map((item) => {
            return `.${item}`;
          })
          .join(", ")} at the moment.`
      );
      return;
    }
    generateSuccessToast(
      "Succesfully Uploaded File",
      `${new_file.name} was uploaded`
    );
    dispatch({ type: action_type, payload: new_file });
  };

  const handleChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    Array.from(e.target.files).forEach((item: File) => {
      addSingleFile(item);
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={label}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id={label}
                name={label}
                type="file"
                className="sr-only"
                onChange={handleChange}
                multiple
              />
            </label>
            {/* <p className="pl-1">or drag and drop</p> */}
          </div>
          <p className="text-xs text-gray-500">
            Currently supports file types of {supported_file_types.join(",")}
          </p>
        </div>
      </div>
      <p className="text-xs mt-2 ml-2  text-gray-500">
        {value ? value.length : 0} file(s) uploaded
      </p>
      <div className="text-xs mt-2 ml-2  text-gray-500">
        {!value
          ? null
          : value.map((file, index) => (
              <div key={index} className="flex items-center my-2">
                <p>{file.name}</p>
                <svg
                  onClick={(e) => {
                    console.log("----Removing index of ", index);
                    dispatch({
                      type: remove_type,
                      payload: index,
                    });
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-4 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FormMultipleFileUpload;
