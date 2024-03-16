import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ReferralContainer from "@/components/_layouts/ReferralContainer";
import { backgroundColor, backgroundColorDark } from "@/assets/colors";
import ScrollComponent from "@/components/_general/ScrollComponent";
import {
  ReferralGenerations,
  allGenerations,
  colorSchemes,
  windowWidth
} from "@/utils/_variables";
import GenerationCard from "@/components/_screens/referrals/GenerationCard";
import ReferralCard from "@/components/_screens/referrals/ReferralCard";
import { AvatarImage } from "@/assets/images";
import { useActionContext } from "@/context";
import { ReferralType } from "@/api/index.d";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import EmptyContainer from "@/components/_layouts/EmptyContainer";

const AssistReferrals = () => {
  const [activeReferralList, setActiveReferralList] = useState(
    ReferralGenerations.First
  );
  const [referrers, setReferrers] = useState<ReferralType[] | null>(null);
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
          {allGenerations.map((data) => (
            <GenerationCard
              value={data.value}
              label={data.label}
              stat={0}
              onChange={() => {
                setActiveReferralList(data);
              }}
              isActive={data.value === activeReferralList.value}
              key={data.value}
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
        {referrers ? (
          referrers.length < 1 ? (
            <EmptyContainer
              text={`Sorry! You have no ${activeReferralList.label} referrals`}
            />
          ) : (
            <ScrollComponent
              style={{
                minHeight: 0
              }}
            >
              {referrers.map(({ email, name }, index) => (
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
    </View>
  );
};

export default AssistReferrals;

const styles = StyleSheet.create({});
