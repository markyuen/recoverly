import { useToast } from "@chakra-ui/react";

const addTwo = (a) => {
  const addA = (b) => {
    return a + b;
  };
  return addA;
};

function useChakraToast() {
  const toast = useToast();

  const genericToast = (status) => {
    const makeToast = (title, description) => {
      toast({
        title,
        description,
        status,
        duration: 2000,
        isClosable: true,
      });
    };
    return makeToast;
  };

  const generateWarningToast = genericToast("warning");
  const generateSuccessToast = genericToast("success");

  return { generateSuccessToast, generateWarningToast };

  //   const toastGeneric = (status) => {
  //     toast({
  //       title: "Account created.",
  //       description: "We've created your account for you.",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   };
}

// function useFriendStatus(friendID) {
//     const [isOnline, setIsOnline] = useState(null);

//     useEffect(() => {
//       function handleStatusChange(status) {
//         setIsOnline(status.isOnline);
//       }

//       ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//       return () => {
//         ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//       };
//     });

//     return isOnline;
//   }
export default useChakraToast;
