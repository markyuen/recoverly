import FormContainer from "../components/Form/FormContainer";
import FormHeading from "../components/Form/FormHeading";
import LoginLayout from "../components/layouts/LoginLayout";

type LoginFormParams = {
  Email: string;
  Password: string;
};

export default function Login() {
  const handleLogin = (e: LoginFormParams) => {
    const { Email, Password } = e;
    console.log(Email, Password);
  };
  return (
    <>
      <LoginLayout>
        <FormHeading
          main_cta="Login to your account"
          subtitle="sign up today"
          subtitle_link="/sign_up"
        />

        <FormContainer
          cta="Sign In"
          onSubmit={handleLogin}
          fields={[
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
          ]}
        />
      </LoginLayout>
    </>
  );
}
