import queries from "../queries/main";
import { fetcherWithBody } from "./swr";

export const makeGraphQLQuery = (operation, variables) => {
  const req_url = `/api/graphql/${operation}`;
  const req_body = {
    query: queries[operation],
    variables,
  };

  return fetcherWithBody(req_url, req_body).then((res) => {
    if (!res || res.errors) {
      const errors = "Error: " + res.errors[0].message;
      throw new Error(errors);
    }
    return res;
  });
};
