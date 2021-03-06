import { useUser } from "@auth0/nextjs-auth0";
import { createContext, useContext, useEffect, useState } from "react";
import { makeGraphQLQuery } from "../lib/GraphQL";

type UserContext = {
  role: string;
  userId: string;
  pendingQuery: boolean;
};

const UserContext = createContext<UserContext>(null!);

export function UserRoleWrapper({ children }) {
  const { user } = useUser();
  const [userRole, setUserRole] = useState("unauthenticated");
  const [userId, setUserId] = useState("");
  const [pendingQuery, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserRole("unauthenticated");
    } else {
      const { sub } = user;
      makeGraphQLQuery("getUserInfo", { user_id: sub })
        .then((res) => {
          const user_data = res.user_by_pk;
          if (
            user_data &&
            user_data.admin) {
            setUserRole("admin");
          } else if (
            user_data &&
            user_data.seller &&
            user_data.seller.verified
          ) {
            setUserRole("verified-seller");
          } else if (
            user_data &&
            user_data.seller
          ) {
            setUserRole("unverified-seller");
          } else {
            setUserRole("customer");
          }
          setUserId(user_data.user_id);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  let sharedState = {
    role: userRole,
    userId: userId,
    pendingQuery,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserContext);
}
