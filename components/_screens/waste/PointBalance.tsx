import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { windowWidth } from "@/utils/_variables";
import { useUserContext } from "@/context";

const PointBalance = () => {
  const { wasteStat, userDetails } = useUserContext();
  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <TextComponent
        fontFamily={Poppins.semiBold.default}
        fontSize={windowWidth * 0.07}
      >
        {userDetails?.valid_waste_points}VWP
      </TextComponent>
      <TextComponent
        style={{
          opacity: 0.6
        }}
      >
        Waste point
      </TextComponent>
    </View>
  );
};

export default PointBalance;

const styles = StyleSheet.create({});
