import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const AssetList: React.FC<{
  max?: number;
  hideTitle?: boolean;
  title?: string;
}> = ({ max, hideTitle, title = "Latest assets" }) => {
  return (
    <View
      style={{
        gap: 20
      }}
    >
      {!hideTitle && (
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {title}
        </TextComponent>
      )}
    </View>
  );
};

export default AssetList;

const styles = StyleSheet.create({});
