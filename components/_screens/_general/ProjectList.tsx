import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import ProjectCard from "../projects/ProjectCard";
import { useUserContext } from "@/context";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import { innerPadding, padding, windowWidth } from "@/utils/_variables";
import { EmptyProjectsLottieAnimation } from "@/assets/lottie";

const ProjectList: React.FC<{
  max?: number;
  hideTitle?: boolean;
  title?: string;
  emptyContainerStyle?: ViewStyle;
}> = ({ max, hideTitle, title = "Latest projects", emptyContainerStyle }) => {
  const { projects } = useUserContext();
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

      {projects.data ? (
        projects.data.length < 1 ? (
          <EmptyContainer
            animation={EmptyProjectsLottieAnimation}
            containerStyle={emptyContainerStyle}
            text="You have no projects at the present moment"
          />
        ) : (
          projects.data
            .slice(0, max)
            .map(
              (
                { status, name, id, total, revenue, starts_at, image, images },
                index
              ) => (
                <ProjectCard
                  name={name}
                  id={id}
                  total={total}
                  amount={revenue?.display}
                  status={status}
                  date={starts_at}
                  image={image}
                  images={images}
                  key={index}
                />
              )
            )
        )
      ) : (
        new Array(max || 6)
          .fill(0)
          .map((_, index) => (
            <SkeletonLoader
              key={index}
              width={windowWidth - padding * 2 - innerPadding * 2}
              height={200}
            />
          ))
      )}
    </View>
  );
};

export default ProjectList;

const styles = StyleSheet.create({});
