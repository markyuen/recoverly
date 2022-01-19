import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

function Profile() {
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

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <div> <h1>Loading</h1> </div>,
  onError: error => <div> <h1>{error.message}</h1> </div>
});
