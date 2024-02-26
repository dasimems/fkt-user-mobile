import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import Image from "@/components/_general/Image";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { blackColor, primaryColor } from "@/assets/colors";
import { whiteColor } from "../../../assets/colors";
import { ScreenNames, colorSchemes } from "@/utils/_variables";
import { useNavigation } from "@react-navigation/native";
import { useActionContext } from "@/context";

const ChatCard: React.FC<{
  sender: {
    id: string;
    name: string;
    image: ImageSourcePropType;
  };
  lastSentMessage: {
    message: string;
    time: string;
  };
  unReadMessages?: number;
  isOnline?: boolean;
}> = ({ sender, lastSentMessage, unReadMessages = 0, isOnline }) => {
  const { colorScheme } = useActionContext();
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate(ScreenNames.ChatDetails.name as never);
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 1,
        borderColor:
          colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : blackColor.opacity100,
        paddingVertical: 20,
        opacity: unReadMessages && unReadMessages > 0 ? 1 : 0.5
      }}
    >
      <View>
        <Image
          image={sender?.image}
          type="round"
          innerPadding={3}
          imageStyle={{
            borderRadius: 9000
          }}
        />
        {isOnline && (
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: primaryColor.default,
              borderRadius: 9000,
              position: "absolute",
              right: 0,
              bottom: 4
            }}
          ></View>
        )}
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {sender?.name}
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          {lastSentMessage?.message}
        </TextComponent>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        {unReadMessages > 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9000,
              backgroundColor: primaryColor.opacity600,
              width: 25,
              height: 25
            }}
          >
            <TextComponent fontSize={11} color={whiteColor.default}>
              {unReadMessages || 0}
            </TextComponent>
          </View>
        )}
        <TextComponent fontFamily={Poppins.medium.default}>
          {lastSentMessage?.time}
        </TextComponent>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({});
