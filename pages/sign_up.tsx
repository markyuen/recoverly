import { useState } from "react";
import FormContainer from "../components/Form/FormContainer";
import FormHeading from "../components/Form/FormHeading";
import FormSwitch from "../components/Form/FormSwitch";

type LoginFormParams = {
  Email: string;
  Password: string;
};

const BuyerFields = [
  {
    name: "Email",
    type: "email",
    config: {
      required: true,
      pattern: /^\S+@\S+$/i,
    },
  },
  {
    name: "Password",
    type: "password",
    config: {
      required: true,
    },
  },
];

const SellerField = [
  {
    name: "First Name",
    type: "text",
    config: {
      required: true,
    },
  },
  {
    name: "Last Name",
    type: "text",
    config: {
      required: true,
    },
  },
  {
    name: "Email",
    type: "email",
    config: {
      required: true,
      pattern: /^\S+@\S+$/i,
    },
  },
  {
    name: "Password",
    type: "password",
    config: {
      required: true,
    },
  },
  {
    name: "Phone Number",
    type: "text",
    config: {
      required: true,
    },
  },
  {
    name: "Company Name",
    type: "text",
    config: {
      required: true,
    },
  },
  {
    name: "ACRA UEN",
    type: "text",
    config: {
      required: true,
    },
  },
  {
    name: "Year Of Incorporation",
    type: "text",
    config: {
      required: true,
    },
  },
];

const BUYER = "BUYER";
const SELLER = "SELLER";

export default function Login() {
  const [type, setType] = useState(BUYER);

  const switchType = () => {
    switch (type) {
      case BUYER:
        setType(SELLER);
        break;
      default:
        setType(BUYER);
        break;
    }
  };
  const fields = type === BUYER ? BuyerFields : SellerField;

  const handleLogin = (e: LoginFormParams) => {
    const { Email, Password } = e;
    console.log(e);
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <FormHeading
              main_cta="Sign Up now"
              subtitle="login to your account"
              subtitle_link="/login"
            />
            <div className="mt-4"></div>
            <FormSwitch
              CTA="Want to sell on our platform?"
              onSubmit={switchType}
            />
            <div>
              <FormContainer
                cta="Sign In"
                onSubmit={handleLogin}
                fields={fields}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
