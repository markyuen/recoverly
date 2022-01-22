const axios = require("axios");

export default async function handler(req, res) {
  const { operation } = req.query;
  const { query, variables } = req.body;

  const graphqlQuery = {
    operationName: operation,
    query,
    variables: variables ? variables : {},
  };

  const response = await axios({
    url: process.env.HASURA_ENDPOINT,
    method: "post",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET,
    },
    data: graphqlQuery,
  });

  const { errors, data } = response;

  if (errors) {
    res.status(400).json({ message: "Error Encountered", error: errors });
  }

  console.log(data);

  res.status(200).json({
    ...data.data,
  });
}
