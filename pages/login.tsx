import FormContainer from "../components/Form/FormContainer";
import FormHeading from "../components/Form/FormHeading";

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
      <div className="h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <FormHeading
              main_cta="Login to your account"
              subtitle="sign up today"
              subtitle_link="/sign_up"
            />

            <div>
              <div className="mt-6">
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
              </div>
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
