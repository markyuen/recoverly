import React from "react";
import InternalLink from "../Common/Link";

type FormHeadingProps = {
  main_cta: string;
  subtitle: string;
  subtitle_link: string;
};

const FormHeading = ({
  main_cta,
  subtitle,
  subtitle_link,
}: FormHeadingProps) => {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{main_cta}</h2>
      <p className="mt-2 flex  items-center text-sm text-gray-600">
        Or{" "}
        <InternalLink
          name={subtitle}
          href={subtitle_link}
          styling="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
        />
      </p>
    </div>
  );
};

export default FormHeading;
