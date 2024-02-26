import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useColorScheme
} from "react-native";
import React from "react";
import { colorSchemes, windowWidth } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, whiteColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { useActionContext } from "@/context";

const DashboardBalance: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const { colorScheme } = useActionContext();
  return (
    <View
      style={{
        ...style
      }}
    >
      <TextComponent
        textAlign="center"
        style={{
          opacity: 0.6
        }}
      >
        Wallet balance
      </TextComponent>
      <TextComponent
        textAlign="center"
        fontSize={windowWidth * 0.08}
        fontFamily={Poppins.bold.default}
      >
        $10,227,000
      </TextComponent>
    </View>
  );
};

export default DashboardBalance;

const styles = StyleSheet.create({});
