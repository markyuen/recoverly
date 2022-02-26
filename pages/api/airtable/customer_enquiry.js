import axios from "axios";

const base = require("airtable").base("apptAQcvlXWiNjGdk");

var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

export default async function handler(req, res) {
  const { name, email, message } = req.body;
  let err_encountered = false;

  const resp = await base("Customer Enquiries").create(
    [
      {
        fields: {
          Email: email,
          "Full Name": name,
          Message: message,
          Status: "Open",
        },
      },
    ],
    function (err, records) {
      if (err) {
        err_encountered = true;
      }
    }
  );
  if (!err_encountered) {
    res.status(200).json({
      message: "Success",
    });
    return;
  }

  res.status(404).json({
    message: "Error Encountered",
  });
}
