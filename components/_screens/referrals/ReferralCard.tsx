import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useColorScheme
} from "react-native";
import React from "react";
import Image from "@/components/_general/Image";
import { colorSchemes } from "@/utils/_variables";
import { blackColor, whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { useActionContext } from "@/context";
import { AvatarImage } from "@/assets/images";

const ReferralCard: React.FC<{
  image: string;
  name: string;
  email: string;
}> = ({ image, name, email }) => {
  const { colorScheme } = useActionContext();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor:
          colorScheme === colorSchemes.dark
            ? whiteColor.opacity100
            : blackColor.opacity100
      }}
    >
      <Image
        innerPadding={3}
        url={image}
        image={AvatarImage}
        type="round"
        width={50}
        height={50}
        imageStyle={{
          borderRadius: 90000
        }}
      />
      <View
        style={{
          gap: 1,
          flex: 1
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {name}
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          {email}
        </TextComponent>
      </View>
    </View>
  );
};

export default ReferralCard;

const styles = StyleSheet.create({});
