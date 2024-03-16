import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TextComponent from "@/components/_general/TextComponent";
import { Poppins } from "@/assets/fonts";
import AssetCard from "../assets/AssetCard";
import { useUserContext } from "@/context";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import { innerPadding, padding, windowWidth } from "@/utils/_variables";
import { EmptyAssetsLottieAnimation } from "@/assets/lottie";

const AssetList: React.FC<{
  max?: number;
  hideTitle?: boolean;
  title?: string;
  emptyContainerStyle?: ViewStyle;
}> = ({ max, hideTitle, title = "Latest assets", emptyContainerStyle }) => {
  const { assets } = useUserContext();
  return (
    <View
      style={{
        gap: 35
      }}
    >
      {!hideTitle && (
        <TextComponent fontFamily={Poppins.semiBold.default}>
          {title}
        </TextComponent>
      )}

      {assets.data ? (
        assets.data.length < 1 ? (
          <EmptyContainer
            animation={EmptyAssetsLottieAnimation}
            containerStyle={emptyContainerStyle}
            text="You have no assets at the present moment"
          />
        ) : (
          assets.data
            .slice(0, max)
            .map(({ value, amount, id, rate, status, project }, index) => (
              <AssetCard
                value={value}
                amount={amount?.display}
                id={id}
                rate={`${rate}%`}
                status={status}
                title={project?.name}
                image={project?.image}
                key={index}
              />
            ))
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

export default AssetList;

const styles = StyleSheet.create({});
