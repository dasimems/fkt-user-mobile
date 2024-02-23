import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";

const ProjectList: React.FC<{
  max?: number;
  hideTitle?: boolean;
  title?: string;
}> = ({ max, hideTitle, title = "Latest projects" }) => {
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

export default ProjectList;

const styles = StyleSheet.create({});
