import { useUser } from "@auth0/nextjs-auth0";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { makeGraphQLQuery } from "../lib/GraphQL";

type UserContext = {
  role: string;
  userId: string;
};

const UserContext = createContext<UserContext>(null!);

export function UserRoleWrapper({ children }) {
  const { user } = useUser();
  const [userRole, setUserRole] = useState("unauthenticated");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (!user) {
      setUserRole("unauthenticated");
    } else {
      const { sub } = user;
      makeGraphQLQuery("getUserInfo", { user_id: sub })
        .then((res) => {
          const user_data = res.user;
          if (user_data && user_data.length > 0 && user_data[0].admin) {
            setUserRole("admin");
          } else if (user_data && user_data.length > 0 && user_data[0].verified) {
            setUserRole("seller");
          } else {
            setUserRole("customer");
          }
          setUserId(user_data[0].user_id);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  let sharedState = {
    role: userRole,
    userId: userId,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserContext);
}
