import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReferralContainer from "@/components/_layouts/ReferralContainer";
import { backgroundColor, backgroundColorDark } from "@/assets/colors";
import ScrollComponent from "@/components/_general/ScrollComponent";
import {
  ReferralGenerations,
  allGenerations,
  colorSchemes
} from "@/utils/_variables";
import GenerationCard from "@/components/_screens/referrals/GenerationCard";
import ReferralCard from "@/components/_screens/referrals/ReferralCard";
import { AvatarImage } from "@/assets/images";
import { useActionContext } from "@/context";

const AssistReferrals = () => {
  const [activeReferralList, setActiveReferralList] = useState(
    ReferralGenerations.First.value
  );
  const { colorScheme } = useActionContext();
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
      <View>
        <ScrollComponent
          horizontal
          style={{
            minHeight: 0,
            gap: 20
          }}
        >
          {allGenerations.map(({ label, value }) => (
            <GenerationCard
              value={value}
              label={label}
              stat={0}
              onChange={() => {
                setActiveReferralList(value);
              }}
              isActive={value === activeReferralList}
              key={value}
            />
          ))}
        </ScrollComponent>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 20
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
    </View>
  );
};

export default AssistReferrals;

const styles = StyleSheet.create({});
