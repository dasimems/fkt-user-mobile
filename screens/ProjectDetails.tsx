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
import {
  colorSchemes,
  innerPadding,
  padding,
  windowWidth
} from "@/utils/_variables";
import { ProjectType } from "@/api/index.d";
import SkeletonLoader from "@/components/_general/SkeletonLoader";

const ProjectDetails = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const { colorScheme } = useActionContext();
  const [details, setDetails] = useState<ProjectType | null>(null);
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 20
      }}
    >
      {details ? (
        <ProjectCard
          amount={details?.revenue?.display}
          date={details?.starts_at}
          id={details?.id}
          image={details?.image}
          images={details?.images}
          name={details?.name}
          status={details?.status}
          total={details?.total}
          isDetails
        />
      ) : (
        <SkeletonLoader
          width={windowWidth - padding * 2 - innerPadding * 2}
          height={200}
        />
      )}
      <View
        style={{
          width: "100%"
        }}
        onLayout={(e) => {
          const { width } = getComponentLayoutProperties(e);
          setChartWidth(width);
        }}
      >
        {details ? (
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
                colorSchemes.dark
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
              marginVertical: 30,
              borderRadius: 10,
              padding: 0,
              width: "100%"
            }}
            yLabelsOffset={30}
            fromZero
          />
        ) : (
          <SkeletonLoader
            width={windowWidth - padding * 2 - innerPadding * 2}
            height={200}
          />
        )}

        {details ? (
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
        ) : (
          <SkeletonLoader
            width={windowWidth - padding * 2 - innerPadding * 2}
            height={200}
          />
        )}
      </View>
      <View
        style={{
          gap: 20
        }}
      >
        <TextComponent fontFamily={Poppins.semiBold.default}>
          Project Details{" "}
        </TextComponent>
        {details ? (
          <TextComponent
            style={{
              opacity: 0.6
            }}
          >
            {details?.description}
          </TextComponent>
        ) : (
          <View
            style={{
              gap: 2
            }}
          >
            {new Array(4).fill(0).map((_, index) => (
              <SkeletonLoader
                key={index}
                width={windowWidth - padding * 2 - innerPadding * 2}
                height={2}
              />
            ))}
          </View>
        )}
      </View>

      {details ? (
        <Image
          url={details?.images[0]}
          image={ProjectImage}
          fullDimension
          width="100%"
          height={300}
        />
      ) : (
        <SkeletonLoader
          width={windowWidth - padding * 2 - innerPadding * 2}
          height={300}
        />
      )}

      <View
        style={{
          gap: 10
        }}
      >
        {details ? (
          <>
            <DetailsCard
              title="Purchase price"
              value={details?.revenue?.display}
            />
            <DetailsCard
              title="Current price"
              value={details?.revenue?.display}
            />
            <DetailsCard title="Sold" value={`${details?.sold}`} />
            <DetailsCard title="Min sale" value={`${details?.min_sale}`} />
            <DetailsCard
              title="Revenue generated"
              value={details?.revenue?.display}
            />
            <DetailsCard title="Start date" value="13 Thursday, April 2023" />
            <DetailsCard title="End date" value="13 Thursday, April 2023" />
            <DetailsCard title="Growth percentage" value={`${details?.rate}`} />
          </>
        ) : (
          <>
            {new Array(8).fill(0).map((_, index) => (
              <SkeletonLoader
                width={windowWidth - padding * 2 - innerPadding * 2}
                height={30}
              />
            ))}
          </>
        )}
      </View>
    </LoggedInContainer>
  );
};

export default ProjectDetails;

const styles = StyleSheet.create({});
