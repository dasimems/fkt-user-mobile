import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import ProjectList from "@/components/_screens/_general/ProjectList";
import axios from "axios";
import { AllResponseType } from "@/api/index.d";
import { ProjectExpectedDataType } from "@/reducers/userReducer";
import { useUserContext } from "@/context";
import { showToast } from "@/utils/functions";
import { LoadingOne } from "@/assets/images";
import { nextLoadingSize } from "@/utils/_variables";

const Projects = () => {
  const { projects, setUserProjects } = useUserContext();
  const [nextLoading, setNextLoading] = useState(false);
  return (
    <LoggedInContainer
      runOnScrollEnd={() => {
        if (projects.next && !nextLoading) {
          setNextLoading(true);
          axios
            .get<AllResponseType>(projects.next)
            .then((res) => {
              const response = res?.data;
              const availableProjects = projects.data || [];

              const userProjects: ProjectExpectedDataType = {
                data: [...availableProjects, ...response?.projects],
                next: response?.links?.next || null,
                total: response?.meta?.total || 0
              };
              setUserProjects(userProjects);
            })
            .catch((err) => {
              showToast(
                err?.response?.data?.message ||
                  err?.message ||
                  "Something went wrong while fetching other available projects"
              );
            })
            .finally(() => {
              setNextLoading(false);
            });
        }
      }}
      contentContainerStyle={{
        minHeight: "100%"
      }}
    >
      <ProjectList
        hideTitle
        emptyContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      />
      {nextLoading && (
        <View
          style={{
            alignItems: "center",
            gap: 10,
            paddingTop: 20
          }}
        >
          <Image
            source={LoadingOne}
            style={{
              width: nextLoadingSize,
              height: nextLoadingSize,
              resizeMode: "contain"
            }}
          />
        </View>
      )}
    </LoggedInContainer>
  );
};

export default Projects;

const styles = StyleSheet.create({});
