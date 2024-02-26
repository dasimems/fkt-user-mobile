import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import ProjectCard from "@/components/_screens/projects/ProjectCard";
import {
  backgroundColor,
  backgroundColorDark,
  blackColor,
  primaryColor,
  whiteColor
} from "@/assets/colors";
import { Poppins } from "@/assets/fonts";
import { LineChart } from "react-native-chart-kit";
import { getComponentLayoutProperties } from "@/utils/functions";
import TextComponent from "@/components/_general/TextComponent";
import Image from "@/components/_general/Image";
import { ProjectImage } from "@/assets/images";
import DetailsCard from "@/components/_screens/_general/DetailsCard";
import { useActionContext } from "@/context";
import { colorSchemes } from "@/utils/_variables";

const ProjectDetails = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const { colorScheme } = useActionContext();
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 20
      }}
    >
      <ProjectCard isDetails />
      <View
        style={{
          width: "100%"
        }}
        onLayout={(e) => {
          const { width } = getComponentLayoutProperties(e);
          setChartWidth(width);
        }}
      >
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={chartWidth} // from react-native
          height={200}
          withInnerLines={false}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            propsForLabels: {
              fontSize: "8",
              fontFamily: Poppins.regular.default
            },

            backgroundColor:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
            backgroundGradientFrom:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
            backgroundGradientTo:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) =>
              colorSchemes.dark ? whiteColor.default : primaryColor.opacity100,
            labelColor: (opacity = 1) =>
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity700
                : blackColor.default,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: primaryColor.opacity300
            }
          }}
          bezier
          style={{
            marginVertical: 30,
            borderRadius: 10,
            padding: 0,
            width: "100%"
          }}
          yLabelsOffset={30}
          fromZero
        />

        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={chartWidth} // from react-native
          height={200}
          withInnerLines={false}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            propsForLabels: {
              fontSize: "8",
              fontFamily: Poppins.regular.default
            },

            backgroundColor:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
            backgroundGradientFrom:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
            backgroundGradientTo:
              colorScheme === colorSchemes.dark
                ? backgroundColorDark.default
                : backgroundColor.default,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) =>
              colorScheme === colorSchemes.dark
                ? whiteColor.default
                : primaryColor.opacity100,
            labelColor: (opacity = 1) =>
              colorScheme === colorSchemes.dark
                ? whiteColor.opacity700
                : blackColor.default,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: primaryColor.opacity300
            }
          }}
          bezier
          style={{
            marginBottom: 30,
            borderRadius: 10,
            padding: 0,
            width: "100%"
          }}
          yLabelsOffset={30}
          fromZero
        />
      </View>
      <View
        style={{
          gap: 20
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          Project Details{" "}
        </TextComponent>
        <TextComponent
          style={{
            opacity: 0.6
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id enim,
          harum alias exercitationem sequi ab eos explicabo consequatur fugit
          aspernatur magnam eius, facere cupiditate facilis voluptatibus
          suscipit perspiciatis in voluptates.
        </TextComponent>
      </View>

      <Image image={ProjectImage} fullDimension width="100%" height={300} />

      <View
        style={{
          gap: 10
        }}
      >
        <DetailsCard title="Purchased price" value="$40" />
        <DetailsCard title="Current price" value="$40" />
        <DetailsCard title="Sold" value="100" />
        <DetailsCard title="Min rate" value="50" />
        <DetailsCard title="Revenue generated" value="$40,000" />
        <DetailsCard title="Start date" value="13 Thursday, April 2023" />
        <DetailsCard title="End date" value="13 Thursday, April 2023" />
        <DetailsCard title="Growth percentage" value="2%" />
      </View>
    </LoggedInContainer>
  );
};

export default ProjectDetails;

const styles = StyleSheet.create({});
