import React from "react";

type ContactInputProps = {
  value: string;
  placeholder: string;
  onChange: (string) => void;
  type: string;
};

const ContactInput = ({
  value,
  onChange,
  placeholder,
  type,
}: ContactInputProps) => {
  return (
    <div>
      <label htmlFor="full-name" className="sr-only">
        Full name
      </label>
      {type === "text" && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          placeholder={placeholder}
        />
      )}

      {type === "textarea" && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default ContactInput;
