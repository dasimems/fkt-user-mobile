import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";
import React from "react";
import { colorSchemes, windowWidth } from "@/utils/_variables";
import TextComponent from "@/components/_general/TextComponent";
import { blackColor, whiteColor } from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { useActionContext, useUserContext } from "@/context";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import { CautionImage } from "@/assets/images";
import Caution from "../_general/Caution";

const DashboardBalance: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const { colorScheme } = useActionContext();
  const { balance } = useUserContext();
  return (
    <View
      style={{
        ...style,
      }}
    >
      <TextComponent
        textAlign="center"
        style={{
          opacity: 0.6,
        }}
      >
        Wallet balance
      </TextComponent>
      {balance ? (
        <TextComponent
          textAlign="center"
          fontSize={windowWidth * 0.08}
          fontFamily={Poppins.bold.default}
        >
          {balance?.wallet?.balance?.display || <Caution />}
        </TextComponent>
      ) : (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <SkeletonLoader />
        </View>
      )}
    </View>
  );
};

export default DashboardBalance;

const styles = StyleSheet.create({});
