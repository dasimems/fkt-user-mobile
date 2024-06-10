import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, primaryColor, whiteColor } from "@/assets/colors";
import { useActionContext } from "@/context";
import { colorSchemes, fireStoreKeys } from "@/utils/_variables";
import { Poppins } from "@/assets/fonts";
import { PostCommentType } from "@/api/index.d";
import { firestoreDB } from "@/api/firestore";
import { doc, getDoc } from "firebase/firestore";
import { FireStoreDetailsType } from "@/reducers/userReducer";

const CommentCard: React.FC<PostCommentType & { isSender?: boolean }> = ({
  isSender,
  comment,
  userId
}) => {
  const { colorScheme } = useActionContext();
  const [userDetails, setUserDetails] = useState<FireStoreDetailsType | null>(
    null
  );
  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const userDetailsRef = doc(firestoreDB, fireStoreKeys.users, userId);
          const userDetails = await getDoc(userDetailsRef);

          if (userDetails.exists()) {
            const user = userDetails.data() as FireStoreDetailsType;

            setUserDetails(user);
          }
        } catch (error) {}
      })();
    }
  }, [userId]);
  return (
    <View
      style={{
        width: "100%",
        flexDirection: isSender ? "row-reverse" : "row"
      }}
    >
      <View
        style={{
          padding: 10,
          paddingHorizontal: 15,
          borderRadius: 20,
          borderBottomLeftRadius: isSender ? 20 : 0,
          borderBottomRightRadius: isSender ? 0 : 20,
          backgroundColor: isSender
            ? primaryColor.default
            : colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : blackColor.opacity100
        }}
      >
        <TextComponent
          color={isSender ? whiteColor.default : undefined}
          fontFamily={Poppins.medium.default}
        >
          {isSender ? "You" : userDetails?.name || "User"}
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
          color={isSender ? whiteColor.default : undefined}
        >
          {comment}
        </TextComponent>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
