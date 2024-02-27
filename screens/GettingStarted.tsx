import { Image, StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import Container from "@/components/_layouts/Container";
import {
  backgroundColorDark,
  blackColor,
  primaryColor,
  whiteColor
} from "@/assets/colors";
import {
  windowWidth,
  colorSchemes,
  padding,
  ScreenNames
} from "@/utils/_variables";
import { LogoTransparentImage } from "@/assets/images";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import Button from "@/components/_general/Button";
import { useNavigation } from "@react-navigation/native";
import { useActionContext } from "@/context";
import Animation from "@/components/_screens/getting-started/Animation";

const GettingStarted = () => {
  const { colorScheme } = useActionContext();
  const { navigate } = useNavigation();
  return (
    <Container
      safeView
      style={{
        paddingVertical: 20,
        paddingHorizontal: padding,
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? backgroundColorDark.default
            : whiteColor.default
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={LogoTransparentImage}
          style={{
            width: 70,
            height: 100,
            resizeMode: "contain"
          }}
        />
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <Animation />
      </View>
      <View
        style={{
          alignItems: "center",
          gap: 15
        }}
      >
        <TextComponent
          textAlign="center"
          color={primaryColor.default}
          fontFamily={Poppins.semiBold.default}
          fontSize={20}
        >
          Foodsoldier
        </TextComponent>
        <TextComponent
          textAlign="center"
          style={{
            opacity: 0.6
          }}
        >
          Join the future by investing and empowering farmers and communities in
          sustainable agriculture for a better future
        </TextComponent>
        <TextComponent textAlign="center" color={"#C0A95E"}>
          Brought to you by Farmkoin
        </TextComponent>
        <Button
          type="primary"
          onPress={() => {
            navigate(ScreenNames.Login.name as never);
          }}
        >
          <TextComponent textAlign="center" color={whiteColor.default}>
            Get started
          </TextComponent>
        </Button>
      </View>
    </Container>
  );
};

export default GettingStarted;

const styles = StyleSheet.create({});
