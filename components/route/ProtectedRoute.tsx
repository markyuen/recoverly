import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

const ProtectedRoute = (props) => {
  const { user, error, isLoading } = useUser();

  return (
    <>
      {isLoading && <p>Loading login info...</p>}

      {error && (
        <>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </>
      )}

      {user && <>{props.children}</>}
    </>
  );
};

export default withPageAuthRequired(ProtectedRoute);
