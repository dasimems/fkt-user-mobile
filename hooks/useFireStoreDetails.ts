import { firestoreDB } from "@/api/firestore";
import { useUserContext } from "@/context";
import { fireStoreKeys } from "@/utils/_variables";
import { doc, onSnapshot } from "firebase/firestore";
import { useCallback } from "react";

const useFireStoreDetails = () => {
  const { userDetails } = useUserContext();
  const getUserFireStoreDetails = useCallback(() => {
    if (userDetails) {
      const unsub = onSnapshot(
        doc(firestoreDB, fireStoreKeys.users, userDetails.id),
        (doc) => {
          console.log("Current data: ", doc.data());
        }
      );
    }
  }, [userDetails]);
  return { getUserFireStoreDetails };
};

export default useFireStoreDetails;
