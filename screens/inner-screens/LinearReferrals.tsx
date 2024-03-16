import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReferralContainer from "@/components/_layouts/ReferralContainer";
import { backgroundColor, backgroundColorDark } from "@/assets/colors";
import ReferralCard from "@/components/_screens/referrals/ReferralCard";
import { AvatarImage } from "@/assets/images";
import ScrollComponent from "@/components/_general/ScrollComponent";
import { useActionContext, useUserContext } from "@/context";
import { colorSchemes, windowWidth } from "@/utils/_variables";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import SkeletonLoader from "@/components/_general/SkeletonLoader";

const LinearReferrals: React.FC = () => {
  const { colorScheme } = useActionContext();
  const { linearReferrals } = useUserContext();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === colorSchemes.dark
            ? backgroundColorDark.default
            : backgroundColor.default
      }}
    >
      {linearReferrals.data ? (
        linearReferrals.data.length < 1 ? (
          <EmptyContainer text="Sorry! You have no linear referrals" />
        ) : (
          <ScrollComponent
            style={{
              minHeight: 0
            }}
          >
            {linearReferrals.data.map(({ email, name }, index) => (
              <ReferralCard
                key={index}
                image={AvatarImage}
                name={name}
                email={email}
              />
            ))}
          </ScrollComponent>
        )
      ) : (
        new Array(6).fill(0).map((_, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <SkeletonLoader
              width={50}
              height={50}
              style={{
                borderRadius: 9000
              }}
            />

            <View
              style={{
                flex: 1
              }}
            >
              <SkeletonLoader width={windowWidth * 0.4} />
              <SkeletonLoader />
            </View>
            <SkeletonLoader width={40} />
          </View>
        ))
      )}
    </View>
  );
};

export default LinearReferrals;

const styles = StyleSheet.create({});
