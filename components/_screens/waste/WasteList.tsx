import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import { primaryColor } from "@/assets/colors";
import WasteCard from "./WasteCard";

const WasteList: React.FC<{ max?: number; showViewAll?: boolean }> = ({
  max,
  showViewAll
}) => {
  return (
    <View
      style={{
        gap: 20
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 20,
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          Donated wastes
        </TextComponent>

        {showViewAll && (
          <TouchableOpacity>
            <TextComponent color={primaryColor.default}>View all</TextComponent>
          </TouchableOpacity>
        )}
      </View>

      {new Array(10)
        .fill(0)
        .slice(0, max)
        .map((_, index) => (
          <WasteCard key={index} />
        ))}
    </View>
  );
};

export default WasteList;

const styles = StyleSheet.create({});
