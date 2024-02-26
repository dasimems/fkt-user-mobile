import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import React, { useState } from "react";
import TextComponent from "../_general/TextComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNames, colorSchemes, referralRoutes } from "@/utils/_variables";
import {
  backgroundColor,
  backgroundColorDark,
  blackColor,
  whiteColor
} from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { useActionContext } from "@/context";

const ReferralContainer: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeName, setActiveName] = useState(
    ScreenNames.LinearReferrals.name
  );
  const { navigate } = useNavigation();
  const { colorScheme } = useActionContext();
  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? backgroundColorDark.default
            : backgroundColor.default
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: 20
        }}
      >
        {referralRoutes.map(({ label, name }) => (
          <TouchableOpacity
            key={name}
            onPress={() => {
              navigate(name as never);
              setActiveName(name);
            }}
            style={{
              ...styles.referralTypeStyle,
              backgroundColor:
                name === activeName
                  ? colorScheme === colorSchemes.dark
                    ? whiteColor.opacity100
                    : whiteColor.default
                  : "transparent"
            }}
          >
            <TextComponent
              fontFamily={
                name === activeName ? Poppins.semiBold.default : undefined
              }
              color={
                name === activeName
                  ? undefined
                  : colorScheme === colorSchemes.dark
                  ? whiteColor.opacity600
                  : blackColor.opacity600
              }
              textAlign="center"
            >
              {label}
            </TextComponent>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default ReferralContainer;

const styles = StyleSheet.create({
  referralTypeStyle: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    flex: 1 / referralRoutes.length,
    alignItems: "center",
    borderRadius: 9000
  }
});
