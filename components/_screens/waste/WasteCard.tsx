import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { whiteColor } from "@/assets/colors";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const WasteCard = () => {
  return (
    <View
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: whiteColor.default,
        borderRadius: 15
      }}
    >
      <TextComponent fontFamily={Poppins.semiBold.default}>
        MAFUKU Area, oshodi / Isolo, Lagos Nigeria
      </TextComponent>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Donation ID:
        </TextComponent>
        <TextComponent fontFamily={Poppins.semiBold.default}>
          6634D34343D53442
        </TextComponent>
      </View>
    </View>
  );
};

export default WasteCard;

const styles = StyleSheet.create({});
