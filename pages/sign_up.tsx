import { useState } from "react";
import FormContainer from "../components/Form/FormContainer";
import FormHeading from "../components/Form/FormHeading";
import FormSwitch from "../components/Form/FormSwitch";
import LoginLayout from "../components/layouts/LoginLayout";

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

export default function SignUp() {
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

  const handleSignUp = (e: LoginFormParams) => {
    const { Email, Password } = e;
    console.log(e);
  };

  return (
    <>
      <LoginLayout>
        <FormHeading
          main_cta="Sign Up now"
          subtitle="login to your account"
          subtitle_link="/login"
        />
        <div className="mt-4"></div>
        <FormSwitch CTA="Want to sell on our platform?" onSubmit={switchType} />
        <div>
          <FormContainer
            cta="Sign In"
            onSubmit={handleSignUp}
            fields={fields}
          />
        </div>
      </LoginLayout>
    </>
  );
}
