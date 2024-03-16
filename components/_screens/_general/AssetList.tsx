import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import AssetCard from "../assets/AssetCard";
import { useUserContext } from "@/context";

const AssetList: React.FC<{
  max?: number;
  hideTitle?: boolean;
  title?: string;
}> = ({ max, hideTitle, title = "Latest assets" }) => {
  const {} = useUserContext();
  return (
    <View
      style={{
        gap: 35
      }}
    >
      {!hideTitle && (
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {title}
        </TextComponent>
      )}

      {new Array(max || 6).fill(0).map((_, index) => (
        <AssetCard key={index} />
      ))}
    </View>
  );
};

export default AssetList;

const styles = StyleSheet.create({});
