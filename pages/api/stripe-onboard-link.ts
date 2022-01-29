import { NextApiHandler } from 'next';

import handleErrors from './middlewares/handleErrors';
import createError from './utils/createError';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler: NextApiHandler = async (req, res) => {
  const body = req.body;

  switch (req.method) {
    case 'POST':
      // const account = await stripe.accounts.create({ type: 'express' });

      // const accountLink = await stripe.accountLinks.create({
      //   account: account.id,
      //   refresh_url: 'https://example.com/reauth',
      //   return_url: 'https://example.com/return',
      //   type: 'account_onboarding',
      // });

      res
        .status(200)
        .json({ hi: "hi" });
      break;

    default:
      throw createError(405, 'Method Not Allowed');
  }
}

export default handleErrors(handler);
