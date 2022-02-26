import React from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";

const ContactInfo = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        Get in touch
      </h2>
      <p className="mt-3 text-lg leading-6 text-gray-500">
        Send us a message using this form or at our email at{" "}
        <span className="bold underline">hello@recoverly.sg</span>
      </p>
      {/* <dl className="mt-8 text-base text-gray-500"> */}
      {/* <div>
          <dt className="sr-only">Postal address</dt>
          <dd>
            <p>742 Evergreen Terrace</p>
            <p>Springfield, OR 12345</p>
          </dd>
        </div>
        <div className="mt-6">
          <dt className="sr-only">Phone number</dt>
          <dd className="flex">
            <PhoneIcon
              className="flex-shrink-0 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <span className="ml-3">+1 (555) 123-4567</span>
          </dd>
        </div>
        <div className="mt-3">
          <dt className="sr-only">Email</dt>
          <dd className="flex">
            <MailIcon
              className="flex-shrink-0 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <span className="ml-3">support@example.com</span>
          </dd>
        </div> */}
      {/* </dl> */}
      <p className="mt-6 text-base text-gray-500">
        Proudly built in Singapore .
      </p>
    </div>
  );
};

export default ContactInfo;
