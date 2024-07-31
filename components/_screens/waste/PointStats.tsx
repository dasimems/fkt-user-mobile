import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { blackColor, whiteColor } from "@/assets/colors";
import { colorSchemes } from "@/utils/_variables";
import { useActionContext, useUserContext } from "@/context";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const PointStats = () => {
  const { colorScheme } = useActionContext();
  const { userDetails } = useUserContext();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "stretch",
        width: "100%"
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 4,
          borderRightWidth: 1,
          borderColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity100,
          flex: 1 / 3,
          paddingVertical: 25,
          paddingHorizontal: 10
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default} textAlign="center">
          {userDetails?.total_donations}
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
          textAlign="center"
        >
          Total number donated
        </TextComponent>
      </View>
      <View
        style={{
          alignItems: "center",
          gap: 4,
          borderRightWidth: 1,
          borderColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity100,
          flex: 1 / 3,
          paddingVertical: 25,
          paddingHorizontal: 10
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default} textAlign="center">
          {userDetails?.total_waste_weight_donated}kg
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
          textAlign="center"
        >
          Total Weight donated
        </TextComponent>
      </View>
      <View
        style={{
          alignItems: "center",
          gap: 4,
          borderRightWidth: 1,
          borderColor:
            colorScheme === colorSchemes.dark
              ? whiteColor.opacity100
              : blackColor.opacity100,
          flex: 1 / 3,
          paddingVertical: 25,
          paddingHorizontal: 10
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default} textAlign="center">
          {userDetails?.pending_waste_points}VWP
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
          textAlign="center"
        >
          Pending waste point
        </TextComponent>
      </View>
    </View>
  );
};

export default PointStats;

const styles = StyleSheet.create({});
