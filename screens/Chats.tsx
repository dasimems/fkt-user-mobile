import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import InputField from "@/components/_general/form/InputField";
import { Search } from "lucide-react-native";
import { defaultIconProps, colorSchemes } from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import ChatCard from "@/components/_screens/chats/ChatCard";
import { AvatarImage } from "@/assets/images";

const Chats = () => {
  const colorScheme = useColorScheme();
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 30
      }}
    >
      <InputField
        placeholder="Search chat"
        rightIcon={
          <Search
            {...defaultIconProps}
            size={20}
            color={
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity600
                : blackColor.opacity600
            }
          />
        }
        inputStyle={{
          backgroundColor: whiteColor.default,
          paddingVertical: 10
        }}
      />
      <View>
        {new Array(6).fill(0).map((_, index) => (
          <ChatCard
            unReadMessages={index % 2}
            isOnline={index % 3 === 0}
            sender={{
              name: "Duyil Ayomid",
              id: "",
              image: AvatarImage
            }}
            lastSentMessage={{
              message: "how are you",
              time: "8:19 AM"
            }}
          />
        ))}
      </View>
    </LoggedInContainer>
  );
};

export default Chats;

const styles = StyleSheet.create({});
