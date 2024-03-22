import { firestoreDB } from "@/api/firestore";
import { useUserContext } from "@/context";
import { FireStoreDetailsType } from "@/reducers/userReducer";
import { fireStoreKeys } from "@/utils/_variables";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useCallback } from "react";

const useFireStoreDetails = () => {
  const { userDetails, setFireStoreDetails, setUserSettings } =
    useUserContext();

  const saveUserDetailsToFireStore = useCallback(async () => {
    if (userDetails) {
      await setDoc(
        doc(firestoreDB, fireStoreKeys.users, userDetails.id),
        {
          name: userDetails.name,
          email: userDetails.email_verified ? userDetails.email : null,
          phoneNumber: userDetails.phone_verified ? userDetails.phone : null,
          avatar: userDetails.avatar,
          id: userDetails.id
        },
        { merge: true }
      );
    }
  }, [userDetails]);

  const getUserFireStoreDetails = useCallback(() => {
    // console.log(userDetails);
    if (userDetails) {
      onSnapshot(
        doc(firestoreDB, fireStoreKeys.users, userDetails.id),
        (doc) => {
          const data: FireStoreDetailsType = doc.data() as FireStoreDetailsType;

          if (data) {
            setFireStoreDetails(data);
          } else {
            saveUserDetailsToFireStore();
          }
        }
      );
    }
  }, [userDetails]);

  const getUserSetting = useCallback(() => {
    if (userDetails) {
      onSnapshot(
        doc(firestoreDB, fireStoreKeys.settings, userDetails.id),
        (doc) => {
          const data = doc.data();

          if (data) {
            setUserSettings(data);
          }
        }
      );
    }
  }, [userDetails]);
  return {
    getUserFireStoreDetails,
    saveUserDetailsToFireStore,
    getUserSetting
  };
};

export default useFireStoreDetails;
