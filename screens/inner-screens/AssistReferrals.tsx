import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useActionContext, useUserContext } from "@/context";
import { ReferralType } from "@/api/index.d";
import SkeletonLoader from "@/components/_general/SkeletonLoader";
import EmptyContainer from "@/components/_layouts/EmptyContainer";
import useUser from "@/hooks/useUser";
import { EmptyReferrersLottieAnimation } from "@/assets/lottie";

const AssistReferrals = () => {
  const { generationReferrals, userDetails } = useUserContext();
  const { fetchUserAssistReferrersStat, fetchUserAssistReferrers } = useUser();
  const [activeReferralList, setActiveReferralList] = useState(
    ReferralGenerations.First
  );
  const [referrers, setReferrers] = useState<ReferralType[] | null>(null);
  const { colorScheme } = useActionContext();

  useEffect(() => {
    fetchUserAssistReferrersStat();
  }, []);

  useEffect(() => {
    if (
      generationReferrals[activeReferralList.value] &&
      !generationReferrals[activeReferralList.value]?.data
    ) {
      fetchUserAssistReferrers(activeReferralList.value);
    }
  }, [activeReferralList, generationReferrals]);

  useEffect(() => {
    const referrers =
      generationReferrals[activeReferralList.value]?.data || null;
    setReferrers(referrers);
  }, [activeReferralList, generationReferrals]);
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
              stat={generationReferrals[data.value]?.total || 0}
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
              animation={EmptyReferrersLottieAnimation}
              containerStyle={{
                flex: 1
              }}
              text={`Sorry! You have no ${activeReferralList.label} referrals`}
            />
          ) : (
            <ScrollComponent
              style={{
                minHeight: 0
              }}
            >
              {referrers.map(({ email, name, avatar }, index) => (
                <ReferralCard
                  key={index}
                  image={avatar}
                  name={name}
                  email={email}
                />
              ))}
            </ScrollComponent>
          )
        ) : (
          <View
            style={{
              gap: 20
            }}
          >
            {new Array(6).fill(0).map((_, index) => (
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
                    flex: 1,
                    gap: 7
                  }}
                >
                  <SkeletonLoader width={windowWidth * 0.4} />
                  <SkeletonLoader />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default AssistReferrals;

const styles = StyleSheet.create({});
