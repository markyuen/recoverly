import { useUser } from "@auth0/nextjs-auth0";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useGraphQLQuery from "../hooks/useQuery";

type UserContext = {
  role: string;
  loading: boolean;
};

const UserContext = createContext<UserContext>(null!);

export function UserRoleWrapper({ children }) {
  const { user, isLoading } = useUser();
  const [userRole, setUserRole] = useState("unauthenticated");
  const [loading, setLoading] = useState(true);
  const { makeGraphQLRequest } = useGraphQLQuery();

  const fetchUserRole = useCallback(
    (email) => {
      makeGraphQLRequest("getUserInfo", { email }, null, true).then((res) => {
        const { user } = res;
        if (!user) return;

        if (user[0] && user[0].admin) {
          setUserRole("admin");
        } else if (user[0] && user[0].seller) {
          setUserRole("seller");
        } else {
          setUserRole("customer");
        }
        setLoading(false);
      });
    },
    [makeGraphQLRequest]
  );

  useEffect(() => {
    if (isLoading) {
      setUserRole("pending");
      return;
    }

    if (!user) {
      setUserRole("unauehtnticated");
      setLoading(false);
    } else {
      const { email } = user;
      fetchUserRole(email);
    }
  }, [user, fetchUserRole, isLoading]);

  let sharedState = {
    role: userRole,
    loading,
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserContext);
}
