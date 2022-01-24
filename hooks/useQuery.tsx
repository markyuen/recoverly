import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { mutate } from "swr";
import { makeGraphQLQuery } from "../lib/GraphQL";
import { fetcherWithBody } from "../lib/swr";
import queries from "../queries/main";

export default function useGraphQLQuery() {
  const toast = useToast();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeGraphQLRequest = (
    operation,
    variables,
    mutate_cb,
    supressToast = false
  ) => {
    setLoading(true);
    return makeGraphQLQuery(operation, variables)
      .then((res) => {
        if (!supressToast) {
          toast({
            title: "Success!",
            description: "Information Updated",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }

        if (mutate_cb) {
          mutate(
            [
              `/api/graphql/${operation}`,
              {
                query: queries[operation],
                variables,
              },
            ],
            mutate_cb,
            false
          );
        }

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return { makeGraphQLRequest, error, loading };
}
