import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoggedInContainer from "@/components/_layouts/LoggedInContainer";
import AssetCard from "@/components/_screens/assets/AssetCard";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import InnerScreenHeader from "@/components/_screens/_general/InnerScreenHeader";
import { getComponentLayoutProperties } from "@/utils/functions";
import {
  backgroundColor,
  backgroundColorDark,
  blackColor,
  primaryColor,
  whiteColor
} from "@/assets/colors";
import { LineChart } from "react-native-chart-kit";
import DetailsCard from "@/components/_screens/_general/DetailsCard";
import { useActionContext } from "@/context";
import {
  colorSchemes,
  innerPadding,
  padding,
  windowWidth
} from "@/utils/_variables";
import { AssetType } from "@/api/index.d";
import SkeletonLoader from "@/components/_general/SkeletonLoader";

const AssetDetails = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const { colorScheme } = useActionContext();
  const [details, setDetails] = useState<AssetType | null>(null);
  return (
    <LoggedInContainer
      hideNav
      header={<InnerScreenHeader />}
      contentContainerStyle={{
        gap: 30
      }}
    >
      {details ? (
        <AssetCard
          image={details?.project?.image}
          rate={`${details?.rate}%`}
          status={details?.status}
          title={details?.project?.name}
          value={details?.value}
          amount={details?.amount?.display}
          id={details?.id}
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
          gap: 7
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
            {details?.project?.description}
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
      {/* <View
        style={{
          gap: 7
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
      </View> */}
      <View
        style={{
          gap: 10
        }}
      >
        {details ? (
          <>
            <DetailsCard
              title="Purchased price"
              value={`$${details?.price_before}`}
            />
            <DetailsCard title="Purchased at" value="13 Thursday, April 2023" />
            <DetailsCard
              title="Current price"
              value={details?.project?.revenue?.display}
            />
            <DetailsCard
              title="Growth percentage"
              value={`${details?.rate}%`}
            />
          </>
        ) : (
          <>
            {new Array(4).fill(0).map((_, index) => (
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

export default AssetDetails;

const styles = StyleSheet.create({});
