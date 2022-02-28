import queries from "../queries/main";
import { fetcherWithBody } from "./swr";
const axios = require("axios");

export const makeGraphQLQuery = (operation, variables) => {
  const req_url = `/api/graphql/${operation}`;
  const req_body = {
    query: queries[operation],
    variables,
  };

  // console.log(req_body);

  return fetcherWithBody({ url: req_url, body: req_body }).then((res) => {
    if (!res || res[0].errors) {
      const errors = "Error: " + res[0].errors[0].message;
      throw new Error(errors);
    }
    return res[0];
  });
};

export const serverSideHasura = async (operation, variables) => {
  const query = queries[operation];
  const { errors, data } = await makeRequestToHasura(
    operation,
    query,
    variables
  );

  if (errors) {
    throw new Error(
      "Unable to fetch data from Hasura when executing " + operation + " query"
    );
  }
  return data.data;
};

export const makeRequestToHasura = async (operation, query, variables) => {
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

  return { errors, data };
};

export const makeRequestToCustomerService = async (
  operation,
  query,
  variables
) => {
  const graphqlQuery = {
    operationName: operation,
    query,
    variables: variables ? variables : {},
  };
  const response = await axios({
    url: process.env.HASURA_CRM_DB_ENDPOINT,
    method: "post",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_CRM_ADMIN_SECRET,
    },
    data: graphqlQuery,
  });

  const { errors, data } = response;

  return { errors, data };
};
