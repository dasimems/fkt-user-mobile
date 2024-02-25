import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import ProjectCard from "../projects/ProjectCard";

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

      {new Array(max || 6).fill(0).map((_, index) => (
        <ProjectCard key={index} />
      ))}
    </View>
  );
};

export default ProjectList;

const styles = StyleSheet.create({});
