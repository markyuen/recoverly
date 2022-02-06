export default function genStripeOnboardingLink(email, firstName, lastName) {
  const url = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID
    }&redirect_uri=${process.env.NEXT_PUBLIC_STRIPE_REDIRECT
    }&stripe_user[email]=${email
    }&stripe_user[first_name]=${firstName
    }&stripe_user[last_name]=${lastName
    }`;
  return url;
}
