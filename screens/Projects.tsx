import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import ProjectList from "@/components/_screens/_general/ProjectList";

const Projects = () => {
  return (
    <LoggedInContainer>
      <ProjectList hideTitle />
    </LoggedInContainer>
  );
};

export default Projects;

const styles = StyleSheet.create({});
