import { UserContext, useUser } from "@auth0/nextjs-auth0";
import { createContext, useContext, useEffect, useState } from "react";

type user_role = "admin" | "seller" | "buyer" | "unauthenticated";

type UserContext = {
  role: user_role;
};

const UserContext = createContext<UserContext>(null!);

export function AppWrapper({ children }) {
  const { user } = useUser();
  const [userRole, setUserRole] = useState("unauthenticated");

  useEffect(() => {
    if (!user) {
      setUserRole("unauthenticated");
    } else {
    }
  }, [user]);

  let sharedState = {
    /* whatever you want */
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserContext);
}
