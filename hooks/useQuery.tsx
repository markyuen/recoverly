import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { mutate } from "swr";
import { fetcherWithBody } from "../lib/swr";
import queries from "../queries/main";

export default function useGraphQLQuery() {
  const toast = useToast();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeGraphQLRequest = (operation, variables, cb) => {
    const req_url = `/api/graphql${operation}`;
    const req_body = {
      query: queries[operation],
      variables,
    };
    setLoading(true);
    return fetcherWithBody(req_url, req_body).then((res) => {
      if (!res || res.errors) {
        const errors = "Error: " + res.errors[0].message;
        setError(res.errors);
        toast({
          title: "Error Encountered",
          description: errors,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else {
        setLoading(false);
        toast({
          title: "Success!",
          description: "Information Updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        mutate([req_url]);
        return res;
      }
    });
  };

  return { makeGraphQLRequest, error, loading };
}
