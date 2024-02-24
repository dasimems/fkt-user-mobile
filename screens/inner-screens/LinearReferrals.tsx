import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReferralContainer from "@/components/_layouts/ReferralContainer";
import { backgroundColor } from "@/assets/colors";
import ReferralCard from "@/components/_screens/referrals/ReferralCard";
import { AvatarImage } from "@/assets/images";
import ScrollComponent from "@/components/_general/ScrollComponent";

const LinearReferrals = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor.default
      }}
    >
      <ScrollComponent
        style={{
          minHeight: 0
        }}
      >
        {new Array(10).fill(0).map((_, index) => (
          <ReferralCard
            key={index}
            image={AvatarImage}
            name="Paul Lekin"
            email="Isaacseun63@gmail.com"
          />
        ))}
      </ScrollComponent>
    </View>
  );
};

export default LinearReferrals;

const styles = StyleSheet.create({});
