import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import ProjectList from "@/components/_screens/_general/ProjectList";

const Projects = () => {
  return (
    <LoggedInContainer>
      <ProjectList
        hideTitle
        emptyContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      />
    </LoggedInContainer>
  );
};

export default Projects;

const styles = StyleSheet.create({});
